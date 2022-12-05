import React, { useState } from "react";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";
import "./newtable.css";
function NewTable({ showCreate }) {
  const initTableData = {
    table_name: "",
    capacity: 0,
  };
  const [tableData, setTableData] = useState(initTableData);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      createTable(tableData, abortController.signal);
      showCreate();
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
    <div className="new-table-container">
      <div className="new-table-header">
      <h5>Create New Table:</h5>
      <div className="new-table-buttons">
        <button className="new-table-close-button" onClick={showCreate}>
          X
        </button>
      </div>
      </div>
      
      <TableForm
        handleChange={changeHandler}
        handleSubmit={submitHandler}
        changeNumber={changeNumber}
        tableData={tableData}
      />
    </div>
  );
}

export default NewTable;
