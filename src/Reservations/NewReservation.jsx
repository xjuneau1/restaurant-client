import React, { useState } from "react";
import { createReservation, createGuest } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import "./newreservations.css";
import GuestsReservationsForm from "../Guests/GuestsReservationForm";
function NewReservation({ setCreate }) {
  const initReservationData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const initGuestData = {
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    company: "",
    waiter: "",
    notes: ""
  }
  const [guestData, setGuestData] = useState(initGuestData)
  const [reservationData, setReservationData] = useState(initReservationData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const submitReservation = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      setGuestData({first_name: reservationData.first_name, last_name: reservationData.last_name})
      await createReservation(reservationData, abortController.signal)
        .then(navigate("/reservations"))
        .then(setCreate(false))
        .then(setError(null));
      await createGuest(guestData, abortController.signal)
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
      <div className="new-reservation-forms-container">
        <ReservationForm
          submitHandler={submitReservation}
          reservationData={reservationData}
          setReservationData={setReservationData}
          setError={setError}
        />
        <GuestsReservationsForm
          guestData={guestData}
          setGuestData={setGuestData}
        />
      </div>
      <button onClick={leavePage}>Close</button>
    </div>
  );
}

export default NewReservation;
