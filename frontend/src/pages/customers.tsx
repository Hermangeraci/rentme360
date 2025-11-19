import React, { useEffect, useState } from 'react';

type Customer = {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  email?: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Clienti</h1>
      {customers.length === 0 ? (
        <p>Nessun cliente presente (ancora).</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              {c.name} {c.surname}
              {c.phone ? ` — 📞 ${c.phone}` : ''}
              {c.email ? ` — ✉️ ${c.email}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
