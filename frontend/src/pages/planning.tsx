import React from "react";

type BookingStatus = "confirmed" | "pending" | "cancelled";

interface Booking {
  id: string;
  customer: string;
  vehicle: string;
  start: string; // ISO string
  end: string;   // ISO string
  status: BookingStatus;
}

const mockBookings: Booking[] = [
  {
    id: "RMN-001",
    customer: "Mario Rossi",
    vehicle: "Scooter 125",
    start: "2025-11-26T09:00:00",
    end: "2025-11-26T13:00:00",
    status: "confirmed",
  },
  {
    id: "RMN-002",
    customer: "John Smith",
    vehicle: "Quad 450",
    start: "2025-11-26T15:00:00",
    end: "2025-11-26T19:00:00",
    status: "pending",
  },
  {
    id: "RMN-003",
    customer: "Laura Bianchi",
    vehicle: "Auto citycar",
    start: "2025-11-27T10:00:00",
    end: "2025-11-27T18:00:00",
    status: "confirmed",
  },
  {
    id: "RMN-004",
    customer: "Paul Dupont",
    vehicle: "Bici elettrica",
    start: "2025-11-28T09:30:00",
    end: "2025-11-28T12:30:00",
    status: "cancelled",
  },
];

const statusLabel: Record<BookingStatus, string> = {
  confirmed: "Confermata",
  pending: "In attesa",
  cancelled: "Annullata",
};

const statusBadgeClass: Record<BookingStatus, string> = {
  confirmed:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800",
  pending:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800",
  cancelled:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800",
};

const PlanningPage: React.FC = () => {
  const [view, setView] = React.useState<"day" | "week" | "month">("day");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<BookingStatus | "all">(
    "all"
  );

  const filteredBookings = mockBookings.filter((b) => {
    const matchesSearch =
      search.trim().length === 0 ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Planning prenotazioni
          </h1>
          <p className="text-sm text-gray-500">
            Vista rapida di tutte le prenotazioni RentMeNow360.
          </p>
        </div>

        <div className="inline-flex overflow-hidden rounded-xl border bg-white">
          <button
            type="button"
            onClick={() => setView("day")}
            className={`px-3 py-2 text-sm ${
              view === "day"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Oggi
          </button>
          <button
            type="button"
            onClick={() => setView("week")}
            className={`px-3 py-2 text-sm ${
              view === "week"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Settimana
          </button>
          <button
            type="button"
            onClick={() => setView("month")}
            className={`px-3 py-2 text-sm ${
              view === "month"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Mese
          </button>
        </div>
      </header>

      {/* Filtri */}
      <section className="mb-4 grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Cerca (cliente, veicolo o ID)
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Es. Mario, quad, RMN-001…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Stato prenotazione
          </label>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as BookingStatus | "all")
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            <option value="all">Tutti</option>
            <option value="confirmed">Confermate</option>
            <option value="pending">In attesa</option>
            <option value="cancelled">Annullate</option>
          </select>
        </div>

        <div className="flex items-end justify-start md:justify-end">
          <button
            type="button"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
          >
            + Nuova prenotazione
          </button>
        </div>
      </section>

      {/* Tabella prenotazioni */}
      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-4 py-2 text-xs font-medium uppercase text-gray-500">
          {view === "day" && "Vista giornaliera"}
          {view === "week" && "Vista settimanale (demo tabellare)"}
          {view === "month" && "Vista mensile (demo tabellare)"}
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
                  Inizio
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                  Fine
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                  Stato
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    Nessuna prenotazione trovata con i filtri attuali.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="px-4 py-2 align-top text-xs font-mono text-gray-700">
                      {booking.id}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-900">
                      {booking.customer}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700">
                      {booking.vehicle}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700">
                      {new Date(booking.start).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700">
                      {new Date(booking.end).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 align-top">
                      <span className={statusBadgeClass[booking.status]}>
                        {statusLabel[booking.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap items-center gap-3 border-t bg-gray-50 px-4 py-3 text-xs text-gray-600">
          <span className="font-medium">Legenda stati:</span>
          <span className={statusBadgeClass.confirmed}>
            {statusLabel.confirmed}
          </span>
          <span className={statusBadgeClass.pending}>
            {statusLabel.pending}
          </span>
          <span className={statusBadgeClass.cancelled}>
            {statusLabel.cancelled}
          </span>
        </div>
      </section>
    </div>
  );
};

export default PlanningPage;
