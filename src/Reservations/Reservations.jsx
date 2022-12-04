import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import NewReservation from "./NewReservation";
import ReservationCard from "./ReservationCard";
import "./reservations.css";
function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [cancelledFinished, setCancelledFinished] = useState([]);
  const [error, setError] = useState(null);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservations() {
      try {
        const reservationsData = await listReservations(abortController.signal);
        setReservations(reservationsData);
        setError(null);
      } catch (err) {
        setError(err);
        return () => abortController.abort();
      }
    }
    loadReservations();
    setCancelledFinished(
      reservations.filter(
        (res) => res.status === "cancelled" || res.status === "finished"
      )
    );
  }, [reservations]);

  const showCreate = () => {
    create === false ? setCreate(true) : setCreate(false);
  };
  if (reservations.length) {
    return (
      <div className="reservations-container">
        <div className="create-button-container">
          <button onClick={showCreate}>Create New Reservation</button>
        </div>
        {create ? <NewReservation setCreate={setCreate} /> : <></>}
        {reservations
          .sort((a, b) =>
            Number(a.reservation_id) > Number(b.reservation_id) ? 1 : -1
          )
          .map((reservation, index) => {
            if (reservation.status === "booked") {
              return (
                <div key={reservation.reservation_id}>
                  <ReservationCard
                    key={reservation.reservation_id}
                    reservation={reservation}
                    setError={setError}
                    error={error}
                    index={reservation.reservation_id}
                  />
                </div>
              );
            }
          })}
        {cancelledFinished.map((reservation) => {
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
