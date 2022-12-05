import React from "react";

function SeatTableForm({
  tableData,
  reservations,
  changeHandler,
  submitHandler,
}) {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="">Select Reservation:</label>
      <select
        name="reservation_id"
        id="reservation_id"
        onChange={changeHandler}
      >
        <option>Name - Capacity - Status</option>
        {reservations.map((res) =>
          res.status === "booked" ? (
            <option
              key={res.reservation_id}
              value={res.reservation_id}
              required={true}
            >
              {res.first_name} {res.last_name} - {res.people} - {res.status}
            </option>
          ) : (
            <option
              disabled
              key={res.reservation_id}
            >
              {res.first_name} {res.last_name} - {res.people} - {res.status}
            </option>
          )
        )}
      </select>
      <button type="submit">Seat Table</button>
    </form>
  );
}

export default SeatTableForm;
