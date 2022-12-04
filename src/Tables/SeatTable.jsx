import React, { useEffect, useState } from "react";
import { listReservations, updateSeat } from "../utils/api";
import SeatTableForm from "./SeatTableForm";

function SeatTable({ table, handleSetTable }) {
  const initTableData = {
    table_id: table.table_id,
    reservation_id: null,
    table_status: "free",
    created_at: "",
    updated_at: "",
  };
  const [tableData, setTableData] = useState(initTableData);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      const abortController = new AbortController();
      try {
        setReservations(await listReservations(abortController.signal))
        
      } catch (err) {
        setError(err);
        return () => abortController.abort();
      }
    }
    fetchReservations();
  }, [reservations]);

  const handleSeatTable = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (window.confirm("Seat this reservation at this table?")) {
        await updateSeat(
          tableData.reservation_id,
          table.table_id,
          abortController.signal
        );
        setError(null);
        handleSetTable();
      }
    } catch (err) {
      setError(err);
      return () => abortController.abort();
    }
  };
  const changeHandler = ({ target }) => {
    setTableData({ ...tableData, [target.name]: target.value });
    console.log(tableData);
  };
  return (
    <div>
      {error ? <div>{error.message}</div>: <></>}
      <SeatTableForm
        reservations={reservations}
        tableData={tableData}
        submitHandler={handleSeatTable}
        changeHandler={changeHandler}
      />
    </div>
  );
}

export default SeatTable;
