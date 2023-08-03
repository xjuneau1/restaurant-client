import React, { useEffect, useState } from "react";
import { listReservations, listGuests } from "../utils/api";
import NewReservation from "./NewReservation";
import ReservationCard from "./ReservationCard";
import "./reservations.css";
import SearchReservation from "./SearchReservation";
function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [create, setCreate] = useState(false);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservations() {
      try {
        setReservations(await listReservations({}, abortController.signal));
        setError(null);
      } catch (err) {
        setError(err);
        return () => abortController.abort();
      }
    }
    async function listAllGuests() {
      try {
        setGuests(await listGuests(abortController.signal));
        setError(null)
      } catch (err) {
        setError(err)
      }
    }
    loadReservations();
    listAllGuests();
  }, [reservations]);

  const showCreate = () => {
    create === false ? setCreate(true) : setCreate(false);
  };
  
  if (reservations.length) {
    return (
      <div className="reservations-container">
        <div className="create-button-container">
          <SearchReservation setReservations={setReservations} />
          <button className="create-button" onClick={showCreate}>
            Create New Reservation
          </button>
        </div>

        {create ? <NewReservation setCreate={setCreate} /> : <></>}
        {reservations
              .sort((a, b) => (a.status > b.status ? 1 : -1))
              .map((reservation) => {
                return (
                  <ReservationCard
                    key={reservation.reservation_id}
                    reservation={reservation}
                    setError={setError}
                    error={error}
                    guests={guests}
                    index={reservation.reservation_id}
                  />
                );
              })
          }
      </div>
    );
  }
}

export default Reservations;
