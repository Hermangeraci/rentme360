1. **Nome file:**  
frontend/src/pages/vehicles.tsx

2. **Codice da sostituire:**  
Intero file

3. **Nuovo codice completo aggiornato:**  
```tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VehiclesPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('rmn_token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rmn_token');
      router.push('/login');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          backgroundColor: '#111827',
          color: 'white',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, marginBottom: 24 }}>RentMeNow</h1>

          <nav style={{ marginBottom: 24 }}>
            <a
              href="/"
              style={{
                display: 'block',
                padding: '8px 0',
                color: '#E5E7EB',
                textDecoration: 'none',
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
                fontWeight: 600,
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
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #374151',
            background: 'transparent',
            color: '#E5E7EB',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Logout
        </button>
      </aside>

      {/* Contenuto principale */}
      <main style={{ flex: 1, padding: 24, backgroundColor: '#F3F4F6' }}>
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>Veicoli</h2>
        <p style={{ marginBottom: 24 }}>
          Qui gestirai il parco mezzi (scooter, auto, quad, bici).
        </p>

        <div
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Elenco veicoli (placeholder)</h3>
          <p style={{ marginBottom: 12, fontSize: 14, color: '#4B5563' }}>
            Per ora è solo una tabella statica, poi la colleghiamo al backend Prisma.
          </p>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Targa</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Categoria</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Modello</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Stato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>GM123AB</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Scooter</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Piaggio Liberty 125</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Disponibile</td>
              </tr>
              <tr>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>GM456CD</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Auto</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Fiat Panda</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Noleggiata</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
```