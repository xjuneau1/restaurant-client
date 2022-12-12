import React, { useState, useEffect, useRef } from "react";
import {
  getReservation,
  updateReservation,
  updateReservationStatus,
} from "../utils/api";
import "./reservationcard.css";
import ReservationForm from "./ReservationForm";
function ReservationCard({ reservation, setError, error }) {
  const [cardInfo, setCardInfo] = useState(false);
  const [reservationData, setReservationData] = useState(reservation);

  const fetchReservation = async () => {
    const abortController = new AbortController();
    try {
      setReservationData(
        await getReservation(reservation.reservation_id, abortController.signal)
      );
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  const handleSetCard = () => {
    cardInfo === false ? setCardInfo(true) : setCardInfo(false);
  };
  
  const handleShowCard = () => {
    handleSetCard();
    fetchReservation();
  };

  const handleChangeReservation = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      console.log(reservationData);
      if (
        window.confirm(
          "Update this reservation?\n\n You may return to edit later."
        )
      ) {
        await updateReservation(
          reservationData,
          reservationData.reservation_id,
          abortController.signal
        );
        setError(null);
      }
    } catch (err) {
      setError(err);
      return () => abortController.abort();
    }
  };

  const handleCancelReservation = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation?\n\n This cannot be undone."
        )
      ) {
        return await updateReservationStatus(
          "cancelled",
          reservation.reservation_id,
          abortController.signal
        );
      }
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };
  return (
    <div className="reservation-container">
      {reservation.status === "booked" || reservation.status === "seated" ? (
        <button className="reservation-button" onClick={handleShowCard}>
          <div className="reservation-info">
            <div className="reservation-data">
              id:{reservation.reservation_id}
            </div>

            <div className="reservation-data">
              Name: {reservation.first_name} {reservation.last_name}
            </div>

            <div className="reservation-data">
              Party Size: {reservation.people}
            </div>

            <div
              className="reservation-status"
              data-reservation-id-status={reservation.reservation_id}
            >
              Status: {reservation.status}
            </div>
          </div>
        </button>
      ) : (
        <div
          className={
            reservation.status === "finished"
              ? "reservation-finish"
              : "reservation-cancelled"
          }
        >
          <div className="reservation-info">
            <div className="reservation-data">
              id:{reservation.reservation_id}
            </div>

            <div className="reservation-data">
              Name: {reservation.first_name} {reservation.last_name}
            </div>

            <div className="reservation-data">
              Party Size: {reservation.people}
            </div>

            <div
              className="reservation-data"
              data-reservation-id-status={reservation.reservation_id}
            >
              Status: {reservation.status}
            </div>
          </div>
        </div>
      )}

      <div
        className={
          cardInfo ? "card-info-container active" : "card-info-container"
        }
      >
        {cardInfo ? (
          <div className="card-info">
            {error ? <div>{error.message}</div> : <div></div>}
            <ReservationForm
              submitHandler={handleChangeReservation}
              reservationData={reservationData}
              setReservationData={setReservationData}
              setError={setError}
            />
            <button onClick={handleSetCard}>Close Card</button>
            <div className="">
              <button
                onClick={handleCancelReservation}
                className=""
                type="button"
              >
                {" "}
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
