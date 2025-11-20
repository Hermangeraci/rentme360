1. **Nome file:**  
index.tsx

2. **Codice da sostituire:**  
intero file corrente

3. **Nuovo codice completo aggiornato:**  
```tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Dashboard() {
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
      <aside
        style={{
          width: 240,
          backgroundColor: '#111827',
          color: 'white',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 24 }}>RentMeNow</h1>

        <nav style={{ marginBottom: 24 }}>
          <Link href="/" passHref>
            <a
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
          </Link>
          <Link href="/vehicles" passHref>
            <a
              style={{
                display: 'block',
                padding: '8px 0',
                color: '#E5E7EB',
                textDecoration: 'none',
              }}
            >
              Veicoli
            </a>
          </Link>
          <Link href="/customers" passHref>
            <a
              style={{
                display: 'block',
                padding: '8px 0',
                color: '#E5E7EB',
                textDecoration: 'none',
              }}
            >
              Clienti
            </a>
          </Link>
          <Link href="/contracts" passHref>
            <a
              style={{
                display: 'block',
                padding: '8px 0',
                color: '#E5E7EB',
                textDecoration: 'none',
              }}
            >
              Contratti
            </a>
          </Link>
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
          <Link href="/vehicles" passHref>
            <a
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
          </Link>
        </div>
      </main>
    </div>
  );
}
```