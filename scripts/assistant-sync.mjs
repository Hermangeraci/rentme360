#!/usr/bin/env node

/**
 * Script di sincronizzazione tra Assistant OpenAI e GitHub.
 *
 * Uso:
 *   node scripts/assistant-sync.mjs "frontend/src/pages/planning.tsx"
 *
 * Funzionamento:
 *   1. Legge (se esiste) il file da GitHub.
 *   2. Chiede all'assistente OpenAI di generare il NUOVO contenuto completo del file,
 *      passando path e contenuto attuale (se esiste).
 *   3. Crea o aggiorna il file su GitHub con un commit automatico.
 */

const [, , filePathArg] = process.argv;

if (!filePathArg) {
  console.error("Errore: specificare il percorso del file, es:");
  console.error('  node scripts/assistant-sync.mjs "frontend/src/pages/planning.tsx"');
  process.exit(1);
}

const filePath = filePathArg.trim();

const {
  OPENAI_API_KEY,
  ASSISTANT_ID,
  GITHUB_TOKEN,
  GITHUB_REPO,
  GITHUB_BRANCH,
} = process.env;

if (!OPENAI_API_KEY || !ASSISTANT_ID || !GITHUB_TOKEN || !GITHUB_REPO || !GITHUB_BRANCH) {
  console.error("Errore: mancano una o più variabili d'ambiente richieste.");
  console.error("Servono: OPENAI_API_KEY, ASSISTANT_ID, GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH");
  process.exit(1);
}

const GITHUB_API_BASE = "https://api.github.com";
const OPENAI_API_BASE = "https://api.openai.com/v1";

/**
 * Legge il contenuto del file da GitHub (se esiste).
 * Ritorna { sha, content } se esiste, oppure { sha: null, content: null } se 404.
 */
async function getExistingFileContent(path) {
  const url = `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents/${encodeURIComponent(
    path
  )}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;

  console.log(`> Lettura file da GitHub: ${path}`);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "assistant-sync-script",
      Accept: "application/vnd.github+json",
    },
  });

  if (res.status === 404) {
    console.log("> Il file non esiste ancora su GitHub: verrà creato da zero.");
    return { sha: null, content: null };
  }

  if (!res.ok) {
    const text = await res.text();
    console.error(
      `Errore nello script: HTTP ${res.status} durante la lettura del file da GitHub.\n${text}`
    );
    process.exit(1);
  }

  const json = await res.json();

  let content = null;
  if (json.content && json.encoding === "base64") {
    content = Buffer.from(json.content, "base64").toString("utf8");
  }

  return { sha: json.sha, content };
}

/**
 * Chiede all'assistente OpenAI di generare il NUOVO contenuto completo del file.
 */
async function generateNewFileContent(path, currentContent) {
  console.log("> Richiesta all'assistente OpenAI per generare il nuovo contenuto del file...");

  const userPrompt = [
    `Sei l'assistente tecnico del progetto RentMe360.`,
    `Devi generare o aggiornare il file: ${path}.`,
    ``,
    `Ti fornisco il contenuto attuale del file (può essere vuoto se il file non esiste ancora).`,
    `Devi restituire ESCLUSIVAMENTE il NUOVO contenuto COMPLETO del file, senza spiegazioni,`,
    `senza testo aggiuntivo, senza markdown e senza backtick.`,
    ``,
    `--- CONTENUTO ATTUALE DEL FILE ---`,
    currentContent ? currentContent : "[FILE NUOVO - NESSUN CONTENUTO]",
    `--- FINE CONTENUTO ATTUALE ---`,
  ].join("\n");

  // 1) Crea un thread con il messaggio dell'utente
  const threadRes = await fetch(`${OPENAI_API_BASE}/threads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    }),
  });

  if (!threadRes.ok) {
    const text = await threadRes.text();
    console.error(`Errore nella creazione del thread OpenAI:\n${text}`);
    process.exit(1);
  }

  const thread = await threadRes.json();

  // 2) Avvia un run con l'assistente specificato
  const runRes = await fetch(`${OPENAI_API_BASE}/threads/${thread.id}/runs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
    },
    body: JSON.stringify({
      assistant_id: ASSISTANT_ID,
    }),
  });

  if (!runRes.ok) {
    const text = await runRes.text();
    console.error(`Errore nell'avvio del run OpenAI:\n${text}`);
    process.exit(1);
  }

  const run = await runRes.json();

  // 3) Polling finché il run non è completato
  let runStatus = run.status;
  let safetyCounter = 0;

  while (runStatus === "queued" || runStatus === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    safetyCounter += 1;

    const checkRes = await fetch(
      `${OPENAI_API_BASE}/threads/${thread.id}/runs/${run.id}`,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    if (!checkRes.ok) {
      const text = await checkRes.text();
      console.error(`Errore nel controllo dello stato del run OpenAI:\n${text}`);
      process.exit(1);
    }

    const check = await checkRes.json();
    runStatus = check.status;

    if (safetyCounter > 60) {
      console.error("Errore: il run OpenAI richiede troppo tempo, interrompo.");
      process.exit(1);
    }
  }

  if (runStatus !== "completed") {
    console.error(`Errore: il run OpenAI non è completato (stato: ${runStatus}).`);
    process.exit(1);
  }

  // 4) Recupera i messaggi finali del thread
  const messagesRes = await fetch(`${OPENAI_API_BASE}/threads/${thread.id}/messages`, {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "OpenAI-Beta": "assistants=v2",
    },
  });

  if (!messagesRes.ok) {
    const text = await messagesRes.text();
    console.error(`Errore nel recupero dei messaggi dal thread OpenAI:\n${text}`);
    process.exit(1);
  }

  const messages = await messagesRes.json();

  const assistantMessage = messages.data.find((m) => m.role === "assistant");
  if (!assistantMessage || !assistantMessage.content || assistantMessage.content.length === 0) {
    console.error("Errore: nessun contenuto restituito dall'assistente.");
    process.exit(1);
  }

  const firstContent = assistantMessage.content[0];

  if (!firstContent.text || !firstContent.text.value) {
    console.error("Errore: il contenuto restituito non è di tipo testo come previsto.");
    process.exit(1);
  }

  const newFileContent = firstContent.text.value;

  console.log("> Nuovo contenuto del file ricevuto dall'assistente.");

  return newFileContent;
}

/**
 * Crea o aggiorna il file su GitHub.
 */
async function upsertFileOnGitHub(path, newContent, existingSha) {
  console.log("> Salvataggio del file su GitHub...");

  const url = `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents/${encodeURIComponent(path)}`;

  const body = {
    message: `chore: aggiornamento ${path} via assistant`,
    content: Buffer.from(newContent, "utf8").toString("base64"),
    branch: GITHUB_BRANCH,
  };

  if (existingSha) {
    body.sha = existingSha;
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "assistant-sync-script",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Errore nell'aggiornamento/creazione del file su GitHub:\n${text}`);
    process.exit(1);
  }

  console.log("> File sincronizzato con successo su GitHub.");
}

/**
 * Funzione principale.
 */
async function main() {
  try {
    const { sha, content } = await getExistingFileContent(filePath);
    const newContent = await generateNewFileContent(filePath, content);
    await upsertFileOnGitHub(filePath, newContent, sha);
    console.log("✅ Sincronizzazione completata.");
  } catch (err) {
    console.error("Errore inatteso nello script assistant-sync:", err);
    process.exit(1);
  }
}

main();
