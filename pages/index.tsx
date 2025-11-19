import React from 'react';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          backgroundColor: '#111827',
          color: 'white',
          padding: '20px 16px',
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 24 }}>RentMeNow</h1>

        <nav>
          <a
            href="/"
            style={{
              display: 'block',
              padding: '8px 0',
              color: '#E5E7EB',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Dashboard
          </a>

          <a
            href="/vehicles"
            style={{
              display: 'block',
              padding: '8px 0',
              color: '#E5E7EB',
              textDecoration: 'none',
            }}
          >
            Veicoli
          </a>

          <a
            href="/customers"
            style={{
              display: 'block',
              padding: '8px 0',
              color: '#E5E7EB',
              textDecoration: 'none',
            }}
          >
            Clienti
          </a>

          <a
            href="/contracts"
            style={{
              display: 'block',
              padding: '8px 0',
              color: '#E5E7EB',
              textDecoration: 'none',
            }}
          >
            Contratti
          </a>
        </nav>
      </aside>

      {/* Contenuto principale */}
      <main style={{ flex: 1, padding: 24, backgroundColor: '#F3F4F6' }}>
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>Dashboard RentMeNow</h2>
        <p style={{ marginBottom: 24 }}>
          Qui vedrai lo stato dei mezzi, le prenotazioni, i clienti e i contratti.
        </p>

        <div
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Inizia dai veicoli</h3>
          <p style={{ marginBottom: 16 }}>
            Prima di tutto, inseriamo e gestiamo il parco mezzi.
          </p>
          <a
            href="/vehicles"
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              backgroundColor: '#2563EB',
              color: 'white',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Vai a elenco veicoli
          </a>
        </div>
      </main>
    </div>
  );
}
