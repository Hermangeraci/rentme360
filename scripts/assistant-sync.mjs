// scripts/assistant-sync.mjs
//
// Script per collegare GitHub ↔ OpenAI Assistant (RentMe360)
// USO (da terminale, nella root del repo):
//   OPENAI_API_KEY=... GITHUB_TOKEN=... ASSISTANT_ID=... node scripts/assistant-sync.mjs path/del/file.jsx
//
// Non inserire MAI le chiavi nel codice, usa solo variabili d'ambiente.

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ASSISTANT_ID = process.env.ASSISTANT_ID || "asst_HjqOoOtcDLlKIPQdh2Z7OSvy";
const GITHUB_REPO = process.env.GITHUB_REPO || "Hermangeraci/rentme360"; // owner/repo
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

if (!OPENAI_API_KEY || !GITHUB_TOKEN) {
  console.error("❌ Manca OPENAI_API_KEY o GITHUB_TOKEN nelle variabili d'ambiente.");
  process.exit(1);
}

const FILE_PATH = process.argv[2];

if (!FILE_PATH) {
  console.error("❌ Specifica il path del file da sincronizzare.\nEsempio: node scripts/assistant-sync.mjs src/pages/Home.tsx");
  process.exit(1);
}

// Piccola utility di pausa
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Wrapper fetch con gestione base errori
async function safeFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText} per ${url}\n${text}`);
  }
  return res.json();
}

// ===== FUNZIONI GITHUB =====

async function githubGetFile(path) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${encodeURIComponent(
    path
  )}?ref=${GITHUB_BRANCH}`;

  const data = await safeFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "rentme360-assistant-script",
      Accept: "application/vnd.github+json",
    },
  });

  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

async function githubUpdateFile(path, newContent, previousSha) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${encodeURIComponent(
    path
  )}`;

  const message = `chore: aggiornamento ${path} via assistant`;

  const body = {
    message,
    content: Buffer.from(newContent, "utf8").toString("base64"),
    branch: GITHUB_BRANCH,
    sha: previousSha,
  };

  const data = await safeFetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "rentme360-assistant-script",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return data;
}

// ===== FUNZIONI OPENAI ASSISTANT =====

const OPENAI_HEADERS = {
  Authorization: `Bearer ${OPENAI_API_KEY}`,
  "Content-Type": "application/json",
  "OpenAI-Beta": "assistants=v2",
};

async function createThreadWithMessage(filePath, fileContent) {
  const url = "https://api.openai.com/v1/threads";

  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Stai lavorando sul repository GitHub ${GITHUB_REPO}, branch ${GITHUB_BRANCH}.\n` +
              `Ti passo il contenuto del file: ${filePath}.\n\n` +
              `Il tuo compito è restituire SOLO la nuova versione COMPLETA del file, senza spiegazioni, senza commenti esterni, solo codice.\n\n` +
              `Contenuto attuale del file:\n\n` +
              "```text\n" +
              fileContent +
              "\n```",
          },
        ],
      },
    ],
  };

  const data = await safeFetch(url, {
    method: "POST",
    headers: OPENAI_HEADERS,
    body: JSON.stringify(body),
  });

  return data.id; // thread_id
}

async function runAssistant(threadId) {
  const url = `https://api.openai.com/v1/threads/${threadId}/runs`;

  const body = {
    assistant_id: ASSISTANT_ID,
  };

  const data = await safeFetch(url, {
    method: "POST",
    headers: OPENAI_HEADERS,
    body: JSON.stringify(body),
  });

  return data.id; // run_id
}

async function waitForRun(threadId, runId) {
  const url = `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`;

  while (true) {
    const data = await safeFetch(url, {
      method: "GET",
      headers: OPENAI_HEADERS,
    });

    if (data.status === "completed") return;
    if (["failed", "cancelled", "expired"].includes(data.status)) {
      throw new Error(`Run fallita con stato: ${data.status}`);
    }

    await sleep(2000);
  }
}

async function getAssistantResponse(threadId) {
  const url = `https://api.openai.com/v1/threads/${threadId}/messages?limit=10`;

  const data = await safeFetch(url, {
    method: "GET",
    headers: OPENAI_HEADERS,
  });

  const assistantMessage = data.data.find(
    (m) => m.role === "assistant"
  );

  if (!assistantMessage) {
    throw new Error("Nessun messaggio dell'assistente trovato.");
  }

  const textParts = assistantMessage.content
    .filter((part) => part.type === "text")
    .map((part) => part.text.value);

  if (!textParts.length) {
    throw new Error("La risposta dell'assistente non contiene testo.");
  }

  // Ci aspettiamo che la risposta sia SOLO il nuovo contenuto del file
  return textParts.join("\n").trim();
}

// ===== FLUSSO PRINCIPALE =====

async function main() {
  try {
    console.log(`▶️  Lettura file da GitHub: ${FILE_PATH}`);
    const { content: oldContent, sha } = await githubGetFile(FILE_PATH);

    console.log("▶️  Creo thread con il contenuto del file...");
    const threadId = await createThreadWithMessage(FILE_PATH, oldContent);

    console.log("▶️  Avvio run dell'assistant...");
    const runId = await runAssistant(threadId);

    console.log("⏳ In attesa che l'assistant completi la run...");
    await waitForRun(threadId, runId);

    console.log("▶️  Recupero la nuova versione del file dall'assistant...");
    const newContent = await getAssistantResponse(threadId);

    if (!newContent || newContent.length < 5) {
      throw new Error("La nuova versione del file sembra vuota o troppo corta, non aggiorno.");
    }

    console.log("▶️  Aggiorno il file su GitHub...");
    await githubUpdateFile(FILE_PATH, newContent, sha);

    console.log("✅ File aggiornato con successo su GitHub.");
  } catch (err) {
    console.error("❌ Errore nello script:", err.message);
    process.exit(1);
  }
}

main();
