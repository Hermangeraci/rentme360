import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CustomersPage() {
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
        }}
      >
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
              fontWeight: 600,
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

        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
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
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>Clienti</h2>
        <p style={{ marginBottom: 24 }}>
          Qui vedrai e gestirai i dati anagrafici dei clienti e i documenti.
        </p>

        <div
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Elenco clienti (placeholder)</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Nome</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Email</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Telefono</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>Documento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Mario Rossi</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>mario@example.com</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>+39 333 1234567</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Patente IT</td>
              </tr>
              <tr>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>John Smith</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>john@example.com</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>+44 7700 123456</td>
                <td style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>Passport UK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
