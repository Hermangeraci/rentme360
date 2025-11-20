import React, { useEffect, useState } from 'react';

interface Booking {
  id: string;
  itemName: string;
  renterName: string;
  startDate: string;
  endDate: string;
  status: string;
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => {
        if (!res.ok) {
          throw new Error('Errore nel caricamento delle prenotazioni');
        }
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div>
      <h1>Prenotazioni</h1>
      {bookings.length === 0 ? (
        <p>Nessuna prenotazione disponibile.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Oggetto</th>
              <th>Locatario</th>
              <th>Data inizio</th>
              <th>Data fine</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.itemName}</td>
                <td>{booking.renterName}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsPage;