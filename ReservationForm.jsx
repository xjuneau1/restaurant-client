import React from "react";
import "./reservationform.css";
function ReservationForm({
  submitHandler,
  reservationData,
  setReservationData
}) {
  const changeHandler = ({ target }) => {
    setReservationData({ ...reservationData, [target.name]: target.value });
    console.log(reservationData)
  };

  const changeNumber = ({ target }) => {
    setReservationData({
      ...reservationData,
      [target.name]: Number(target.value),
    });
  };
  return (
    <div className="reservation-form-container">
      <form onSubmit={submitHandler}>
        <div className="reservation-form-column">
          <div className="reservation-form-input-container">
            <div className="reservation-form-input-icon">Date</div>
            <input
              className="reservation-form-input"
              onChange={changeHandler}
              value={reservationData.reservation_date}
              type="date"
              id="reservation_date"
              name="reservation_date"
              required
            />
          </div>

          <div className="reservation-form-input-container">
            <div className="reservation-form-input-icon">Time</div>
            <input
              className="reservation-form-input"
              onChange={changeHandler}
              value={reservationData.reservation_time}
              type="time"
              placeholder="HH:MM"
              id="reservation_time"
              name="reservation_time"
              required
            />
          </div>

          <div className="reservation-form-input-container">
            <div className="reservation-form-input-icon">Party</div>
            <input
              className="reservation-form-input"
              onChange={changeNumber}
              value={reservationData.people}
              type="text"
              id="people"
              name="people"
              max="12"
              min="1"
              aria-label="Number of people"
              required
            />
          </div>

          <div className="reservation-form-input-container">
            <div className="reservation-form-input-icon">First</div>
            <input
              className="reservation-form-input"
              onChange={changeHandler}
              value={reservationData.first_name}
              type="text"
              id="first_name"
              name="first_name"
              required
            />
          </div>

          <div className="reservation-form-input-container">
            <div className="reservation-form-input-icon">Last</div>
            <input
              className="reservation-form-input"
              onChange={changeHandler}
              value={reservationData.last_name}
              type="text"
              id="last_name"
              name="last_name"
              required
            />
          </div>

          <div className="reservation-form-input-container">
            <div className="reservation-form-input-icon">Mobile</div>
            <input
              className="reservation-form-input"
              onChange={changeHandler}
              value={reservationData.mobile_number}
              placeholder="XXX-XXX-XXXX"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              id="mobile_number"
              name="mobile_number"
              required
            />
          </div>
          <button className="reservation-submit-button" type="submit">
                Submit Changes{" "}
              </button>
          {/* 
            Email:
            <input
              className="reservation-form-input"
              onChange={changeHandler}
              value={reservationData.email}
              placeholder="XXX-XXX-XXXX"
              type="email"
              id="email"
              name="email"
              required
            />
           */}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
