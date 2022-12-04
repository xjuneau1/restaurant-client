import React, { useState } from "react";
import { getTable, updateTable } from "../utils/api";
import TableForm from "./TableForm";
import "./tablecard.css";

function TableCard({ table }) {
  const [tableInfo, setTableInfo] = useState(false);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(table);

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
  const handleUpdateTable = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (
        window.confirm("Update this table?\n\n You may return to edit later.")
      ) {
        await updateTable(
          tableData,
          tableData.table_id,
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
  };
  const changeNumber = ({ target }) => {
    setTableData({ ...tableData, [target.name]: Number(target.value) });
  };
  return (
    <>
      <button onClick={handleShowCard} className="table-card-container">
        <div className="table-card-content">
          <div className="table-card-data">Name: {table.table_name}</div>
          <div className="table-card-data">Capacity: {table.capacity}</div>
        </div>
      </button>

      {tableInfo ? (
        <div className="edit-table-container">
          <TableForm
            tableData={tableData}
            handleChange={changeHandler}
            handleSubmit={handleUpdateTable}
            changeNumber={changeNumber}
          />
          <button onClick={handleSetTable}>Close</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TableCard;
