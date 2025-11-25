import React from "react";

const BookingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Prenotazioni</h1>
        <p className="mt-1 text-sm text-gray-500">
          Qui potrai gestire tutte le prenotazioni dei mezzi del tuo parco.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">
          Questa sezione è ancora in fase di sviluppo.  
          A breve potrai:
        </p>

        <ul className="list-disc pl-6 mt-3 text-sm text-gray-700 space-y-1">
          <li>Creare nuove prenotazioni</li>
          <li>Modificare le prenotazioni esistenti</li>
          <li>Visualizzare il calendario delle consegne e dei rientri</li>
          <li>Sincronizzare i dati con il planning e i clienti</li>
        </ul>

        <p className="mt-4 text-[11px] text-gray-400">
          Pagina placeholder — verrà collegata al backend più avanti.
        </p>
      </section>
    </div>
  );
};

export default BookingsPage;
