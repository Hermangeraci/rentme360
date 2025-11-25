import React from "react";

interface KpiCardProps {
  label: string;
  value: string;
  description?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, description }) => (
  <div className="rounded-2xl border bg-white p-4 shadow-sm">
    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    {description && (
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    )}
  </div>
);

interface TodayBooking {
  id: string;
  customer: string;
  vehicle: string;
  start: string;
  end: string;
  status: "confirmed" | "pending" | "cancelled";
}

const todayMockBookings: TodayBooking[] = [
  {
    id: "RMN-010",
    customer: "Anna Verdi",
    vehicle: "Scooter 125",
    start: "09:00",
    end: "13:00",
    status: "confirmed",
  },
  {
    id: "RMN-011",
    customer: "James Brown",
    vehicle: "Quad 450",
    start: "10:30",
    end: "14:30",
    status: "pending",
  },
  {
    id: "RMN-012",
    customer: "Lucia Neri",
    vehicle: "Bici elettrica",
    start: "16:00",
    end: "19:00",
    status: "confirmed",
  },
];

const statusLabel: Record<TodayBooking["status"], string> = {
  confirmed: "Confermata",
  pending: "In attesa",
  cancelled: "Annullata",
};

const statusBadgeClass: Record<TodayBooking["status"], string> = {
  confirmed:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800",
  pending:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800",
  cancelled:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800",
};

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard RentMeNow360
          </h1>
          <p className="text-sm text-gray-500">
            Panoramica giornaliera delle operazioni di noleggio.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
          >
            + Nuova prenotazione
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Apri planning
          </button>
        </div>
      </header>

      {/* KPI */}
      <section className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Prenotazioni oggi"
          value="12"
          description="Totale check-out + check-in previsti per oggi."
        />
        <KpiCard
          label="Veicoli fuori"
          value="8"
          description="Mezzi attualmente noleggiati."
        />
        <KpiCard
          label="Incasso stimato oggi"
          value="€ 1.240"
          description="Somma dei noleggi odierni (lordo)."
        />
        <KpiCard
          label="Multe aperte"
          value="3"
          description="Multe ancora da gestire / addebitare."
        />
      </section>

      {/* Corpo principale */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Prenotazioni di oggi */}
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b bg-gray-50 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Prenotazioni di oggi
            </h2>
            <p className="text-xs text-gray-500">
              Elenco sintetico delle principali prenotazioni della giornata.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                    Cliente
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                    Veicolo
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                    Orario
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                    Stato
                  </th>
                </tr>
              </thead>
              <tbody>
                {todayMockBookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-4 py-2 text-xs font-mono text-gray-700">
                      {b.id}
                    </td>
                    <td className="px-4 py-2 text-gray-900">{b.customer}</td>
                    <td className="px-4 py-2 text-gray-700">{b.vehicle}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {b.start} – {b.end}
                    </td>
                    <td className="px-4 py-2">
                      <span className={statusBadgeClass[b.status]}>
                        {statusLabel[b.status]}
                      </span>
                    </td>
                  </tr>
                ))}
                {todayMockBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      Nessuna prenotazione prevista per oggi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Azioni rapide */}
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">
              Azioni rapide
            </h2>
            <p className="mb-3 text-xs text-gray-500">
              Scorciatoie per le operazioni più frequenti in sede.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="w-full rounded-lg bg-gray-900 px-3 py-2 text-left text-sm font-medium text-white hover:bg-black"
              >
                + Registra nuova prenotazione
              </button>
              <button
                type="button"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-800 hover:bg-gray-100"
              >
                Controlla veicoli da rientrare
              </button>
              <button
                type="button"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-800 hover:bg-gray-100"
              >
                Gestisci multe e sanzioni
              </button>
              <button
                type="button"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-800 hover:bg-gray-100"
              >
                Apri elenco clienti
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-xs text-gray-600 shadow-sm">
            <h3 className="mb-1 text-sm font-semibold text-gray-900">
              Note operative
            </h3>
            <ul className="list-disc space-y-1 pl-4">
              <li>Integrare in seguito i dati reali dal backend.</li>
              <li>
                Collegare il pulsante “Apri planning” alla route
                <code className="ml-1 rounded bg-gray-100 px-1 py-0.5">
                  /planning
                </code>
                .
              </li>
              <li>
                Aggiungere un widget meteo o traffico per Cefalù come extra.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
