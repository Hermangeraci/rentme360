import React, { useEffect, useState } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Elenco veicoli</h1>
      <ul>
        {vehicles.map(v => (
          <li key={v.id}>
            {v.marca} {v.modello} — {v.targa}
          </li>
        ))}
      </ul>
    </div>
  );
}
