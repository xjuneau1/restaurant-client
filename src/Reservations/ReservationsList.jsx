import React from "react";
import ReservationCard from "./ReservationCard";

import { today } from "../utils/date-time"
import "./reservationslist.css"
function ReservationsList({ reservations, setError, error }) {
  
  if (reservations.length) {
    return (
      <div className="reservation-list-container">
        {reservations.map((reservation, index) => {
          if (
            reservation.status !== "finished" &&
            reservation.status !== "cancelled"
          ) {
            return (
              <ReservationCard
                key={reservation.reservation_id}
                reservation={reservation}
                setError={setError}
                error={error}
                index={reservation.reservation_id}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default ReservationsList;
