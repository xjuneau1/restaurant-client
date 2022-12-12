import React, { useEffect, useState, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReservationsList from "../Reservations/ReservationsList";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import "./dashboard.css";
function Dashboard({ date }) {
  const [reservations, setReservations] = useState({});
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  if (search) {
    date = search.replace("?date=", "");
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    async function loadReservations() {
      try {
        const reservationsData = await listReservations(
          { date: date },
          abortController.signal
        );
        setReservations(reservationsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
    }

    // async function loadTables() {
    //   try {
    //     setTables(await listTables(abortController.signal));
    //     setError(null);
    //   } catch (err) {
    //     setError(err);
    //   }
    // }

    loadReservations();
    // loadTables();
    return () => abortController.abort();
  }

  useEffect(() => {
    loadDashboard();
  }, [date]);

  const previousHandler = () => {
    navigate(`/dashboard?date=${previous(date)}`);
  };

  const todayHandler = () => {
    navigate(`/dashboard?date=${today()}`);
  };

  const nextHandler = () => {
    navigate(`/dashboard?date=${next(date)}`);
  };

  return (
    <div className="dashboard-container">
      
      <div className="buttons-container">
        <button onClick={previousHandler}>
          Previous
        </button>
        <button onClick={todayHandler}>
          Today
        </button>
        <button onClick={nextHandler}>
          Next
        </button>
        </div>
      
      <ReservationsList
        reservations={reservations}
        setError={setError}
        error={error}
      />
    </div>
  );
}

export default Dashboard;
