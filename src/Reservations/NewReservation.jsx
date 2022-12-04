import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import "./newreservations.css";
function NewReservation({ setCreate }) {
  const initReservationData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [reservationData, setReservationData] = useState(initReservationData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const submitReservation = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      return await createReservation(reservationData, abortController.signal)
        .then(navigate("/reservations"))
        .then(setCreate(false))
        .then(setError(null));
    } catch (err) {
      setError(err);
      return () => abortController.abort();
    }
    
  };

  const leavePage = () => {
    setCreate(false);
  };
  return (
    <div className="new-reservation-container">
      {error ? <div>{error.message}</div> : <></>}
      <ReservationForm
        submitHandler={submitReservation}
        reservationData={reservationData}
        setReservationData={setReservationData}
        setError={setError}
      />
      <button onClick={leavePage}>Close</button>
    </div>
  );
}

export default NewReservation;
