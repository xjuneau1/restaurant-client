import React, { useEffect, useState } from "react";
import { getReservation, getTable, updateTable } from "../utils/api";
import TableForm from "./TableForm";
import EditTable from "./EditTable";
import "./tablecard.css";
import DeleteTableButton from "./DeleteTableButton";
import SeatTable from "./SeatTable";
import FinishTableButton from "./FinishTableButton";

function TableCard({ table }) {
  const [tableInfo, setTableInfo] = useState(false);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(table);
  const [reservation, setReservation] = useState({})

    
  useEffect(()=>{
    async function fetchReservation() {
        const abortController = new AbortController()
        try {
            if(table.reservation_id){
                setReservation(await getReservation(table.reservation_id))
            }
           return setError(null)
        } catch (err) {
            setError(err)
            return () => abortController.abort()
        }
    }
    fetchReservation()
  },[table])

  const fetchTable = async () => {
    const abortController = new AbortController();
    try {
      await getTable(tableData.table_id, abortController.signal);
      setError(null);
    } catch (err) {
      setError(err);
      return () => abortController.abort();
    }
  };

  const handleSetTable = () => {
    tableInfo === false ? setTableInfo(true) : setTableInfo(false);
  };

  const handleShowCard = () => {
    fetchTable();
    handleSetTable();
  };

  return (
    <>
    {error ? error.message: null}
      <div className="table-card">
      <button onClick={handleShowCard} className="table-card-container" >
        <div className="table-card-content">
          <div className="table-card-data">ID: {table.table_id}</div>
          <div className="table-card-data">Name: {table.table_name}</div>
          <div className="table-card-data">Capacity: {table.capacity}</div>
          <div className="table-card-data">Status: {table.table_status}</div>
          <div className="table-card-data">Reservation ID: {table.reservation_id}</div>
          {reservation ? <div className="table-card-data">Guest:{reservation.first_name} {reservation.status}</div>: <></>}
          
          
        </div>
      </button>
      {table.table_status === "occupied" ? <FinishTableButton table={table} setError={setError} error={error} reservation={reservation}/>: <></>}
      </div>

      {tableInfo ? (
        <div className="edit-table-container">
          <div className="edit-table-forms">
            <div className="edit-table-form">
              <h5>Edit Table:</h5>
              <EditTable
                tableData={tableData}
                setTableData={setTableData}
                setError={setError}
                handleSetTable={handleSetTable}
              />
            </div>
            <div className="edit-table-form">
                <h5>Seat Table:</h5>
              <SeatTable table={table} handleSetTable={handleSetTable} />
            </div>
          </div>
          <div className="edit-table-buttons">
            <DeleteTableButton
              table={table}
              handleSetTable={handleSetTable}
              setError={setError}
            />
            <button onClick={handleSetTable}>Close</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TableCard;
