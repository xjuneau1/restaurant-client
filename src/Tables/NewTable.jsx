import React, { useState } from "react";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";
import "./newtable.css"
function NewTable({showCreate}) {
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
      showCreate()
    } catch (err) {
      setError(err);
      return () => abortController.abort();
    }
  };

  const changeHandler = ({ target }) => {
    setTableData({ ...tableData, [target.name]: target.value });
  };
  const changeNumber =({target}) => {
    setTableData({ ...tableData, [target.name]: Number(target.value)})
  }
  return (
    <div className="new-table-container">
      <TableForm
        handleChange={changeHandler}
        handleSubmit={submitHandler}
        changeNumber={changeNumber}
        tableData={tableData}
      />
      <button onClick={showCreate}>Close</button>
    </div>
  );
}

export default NewTable;
