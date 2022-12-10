import React from "react";
import "./searchreservationform.css";
function SearchReservationForm({
  changeHandler,
  submitHandler,
  handleResetReservations,
}) {
  return (
    <div className="search-reservation-form-container">
      <form className="search-reservation-form" onSubmit={submitHandler}>
        <div className="search-reservation-form-label">Search:</div>
        <input className="search-reservation-form-input" type={"text"} onChange={changeHandler}></input>
        <button className="search-reservation-form-button" type="submit">Submit</button>
      </form>
      <button className="search-reservation-form-button" onClick={handleResetReservations}>Reset</button>
    </div>
  );
}

export default SearchReservationForm;
