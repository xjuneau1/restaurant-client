import React from "react";
import "./seattableform.css"
function SeatTableForm({
  tableData,
  reservations,
  changeHandler,
  submitHandler,
}) {
  return (
    <form className="seat-table-form" onSubmit={submitHandler}>
      <div className="seat-table-form-title">Select Reservation:</div>
      <select
      className="seat-table-form-select"
        name="reservation_id"
        id="reservation_id"
        onChange={changeHandler}
      >
        <option className="seat-table-form-option">Name - Capacity - Status</option>
        {reservations.map((res) =>
          res.status === "booked" ? (
            <option
            className="seat-table-form-option"
              key={res.reservation_id}
              value={res.reservation_id}
              required={true}
            >
              {res.first_name} {res.last_name} - {res.people} - {res.status}
            </option>
          ) : (
            <option
              disabled
              className="seat-table-form-option"
              key={res.reservation_id}
            >
              {res.first_name} {res.last_name} - {res.people} - {res.status}
            </option>
          )
        )}
      </select>
      <button className="seat-table-form-button" type="submit">Seat Table</button>
    </form>
  );
}

export default SeatTableForm;
