import React from "react";
import "./guestreservationform.css";
function GuestsReservationsForm({setGuestData, guestData}) {
  const changeHandler = ({ target }) => {
    setGuestData({ ...guestData, [target.name]: target.value });
    console.log(guestData)
  };
 if(guestData){
    return (
        <div className="guest-reservation-form-container">
          <form>
            <div className="guest-reservation-form-input-container">
              <div className="guest-reservation-form-input-icon">Email</div>
              <input onChange={changeHandler} defaultValue={guestData.email} className="guest-reservation-form-input"></input>
            </div>
            <div className="guest-reservation-form-input-container">
              <div className="guest-reservation-form-input-icon">Birthday</div>
              <input onChange={changeHandler} defaultValue={guestData.birthday} type="date" className="guest-reservation-form-input"></input>
            </div>
            <div className="guest-reservation-form-input-container">
              <div className="guest-reservation-form-input-icon">Company</div>
              <input onChange={changeHandler} defaultValue={guestData.company} className="guest-reservation-form-input"></input>
            </div>
            <div className="guest-reservation-form-input-container">
              <div className="guest-reservation-form-input-icon">Waiter</div>
              <input onChange={changeHandler} defaultValue={guestData.waiter} className="guest-reservation-form-input"></input>
            </div>
            <div className="guest-reservation-form-input-container">
              <div className="guest-reservation-form-input-icon">Notes</div>
              <textarea onChange={changeHandler} defaultValue={guestData.notes} className="guest-reservation-form-input"></textarea>
            </div>
          </form>
        </div>
      );
 } else {
  return (
    <div className="guest-reservation-form-container">
      <form>
        /* <div className="guest-reservation-form-input-container">
          <div className="guest-reservation-form-input-icon">Email</div>
          <input onChange={changeHandler} value={guestData.email} className="guest-reservation-form-input"></input>
        </div> */
        <div className="guest-reservation-form-input-container">
          <div className="guest-reservation-form-input-icon">Birthday</div>
          <input onChange={changeHandler} value={guestData.birthday} type="date" className="guest-reservation-form-input"></input>
        </div>
        <div className="guest-reservation-form-input-container">
          <div className="guest-reservation-form-input-icon">Company</div>
          <input onChange={changeHandler} value={guestData.company} className="guest-reservation-form-input"></input>
        </div>
        <div className="guest-reservation-form-input-container">
          <div className="guest-reservation-form-input-icon">Waiter</div>
          <input onChange={changeHandler} value={guestData.waiter} className="guest-reservation-form-input"></input>
        </div>
        <div className="guest-reservation-form-input-container">
          <div className="guest-reservation-form-input-icon">Notes</div>
          <textarea onChange={changeHandler} value={guestData.notes} className="guest-reservation-form-input"></textarea>
        </div>
      </form>
    </div>
  );
 }
 
}

export default GuestsReservationsForm;
