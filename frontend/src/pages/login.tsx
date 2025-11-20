1. **Nome file:**  
frontend/src/pages/login.tsx

2. **Codice da sostituire:**  
Intero contenuto del file.

3. **Nuovo codice completo aggiornato:**  
```tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const VALID_EMAIL = 'admin@rentmenow.test';
const VALID_PASSWORD = 'rentme360';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('rmn_token');
      if (token) {
        router.replace('/');
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        localStorage.setItem('rmn_token', 'rentmenow-demo-token');
        router.push('/');
      } else {
        setError('Credenziali non valide');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111827',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          background: '#FFFFFF',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 4 }}>RentMeNow</h1>
        <p style={{ color: '#6B7280', marginBottom: 20 }}>
          Accedi al gestionale interno
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #D1D5DB',
              marginBottom: 12,
              fontSize: 14,
            }}
          />

          <label
            style={{
              display: 'block',
              fontSize: 14,
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #D1D5DB',
              marginBottom: 16,
              fontSize: 14,
            }}
          />

          {error && (
            <div
              style={{
                marginBottom: 12,
                padding: '8px 10px',
                borderRadius: 6,
                background: '#FEE2E2',
                color: '#B91C1C',
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: 'none',
              background: loading ? '#60A5FA' : '#2563EB',
              color: 'white',
              fontWeight: 600,
              fontSize: 15,
              cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Accesso in corso…' : 'Accedi'}
          </button>

          <p
            style={{
              marginTop: 16,
              fontSize: 12,
              color: '#9CA3AF',
              lineHeight: 1.4,
            }}
          >
            Demo login:<br />
            <strong>Email:</strong> {VALID_EMAIL}
            <br />
            <strong>Password:</strong> {VALID_PASSWORD}
          </p>
        </form>
      </div>
    </div>
  );
}
```