import React from "react";

const ContractsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Contratti</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sezione contratti di RentMeNow360. Qui in futuro potrai gestire i
          contratti di noleggio, firme digitali e documenti dei clienti.
        </p>
      </header>

      <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600 shadow-sm">
        <p>
          L&apos;area contratti è ancora in fase di sviluppo. Nel frattempo puoi
          utilizzare le sezioni <strong>Veicoli</strong>,{" "}
          <strong>Clienti</strong> e <strong>Prenotazioni</strong> per gestire
          l&apos;operatività quotidiana.
        </p>
        <p className="mt-3">
          Quando sarà pronta, da qui potrai:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Creare e archiviare contratti di noleggio standard.</li>
          <li>Gestire allegati e scansioni di documenti.</li>
          <li>Tenere traccia di firme e scadenze.</li>
        </ul>
      </section>
    </div>
  );
};

export default ContractsPage;
