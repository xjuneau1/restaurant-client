import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationCard from "./ReservationCard";
function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null)
  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservations() {
      try {
        const reservationsData = await listReservations(abortController.signal);
        setReservations(reservationsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, []);
  if (reservations.length) {
    return (
      <div>
        {reservations.map((reservation, index) => {
          return (
            <ReservationCard
              key={reservation.reservation_id}
              reservation={reservation}
              setError={setError}
              error={error}
              index={reservation.reservation_id}
            />
          );
        })}
      </div>
    );
  }
}

export default Reservations;
