import React, { useState } from "react";
import { listReservations } from "../utils/api";
import SearchReservationForm from "./SearchReservationForm";
function SearchReservation({ setReservations }) {
  let [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const changeHandler = async ({ target }) => {
    setSearch(target.value);
    console.log(search);
  };

  const searchReservations = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (/\d/.test(search)) {
        setReservations(await listReservations({ mobile_number: search }, abortController.signal));
      } else {
        setReservations(await listReservations({ name: search }, abortController.signal));
      }
    } catch (err) {
      setError(err);
      return () => abortController.abort()
    }
  };

  const handleResetReservations = async () => {
    const abortController = new AbortController()
    try {
        setReservations(await listReservations(abortController.signal))
    } catch (err) {
        setError(err)
        return () => abortController.abort()
    }
  }
  return (
    <SearchReservationForm
      changeHandler={changeHandler}
      submitHandler={searchReservations}
      handleResetReservations={handleResetReservations}
    />
  );
}

export default SearchReservation;
