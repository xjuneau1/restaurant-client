import React, { useState } from "react";
import "./tableform.css"
function TableForm({handleChange, handleSubmit, changeNumber, tableData}) {
  return (
    <form className="table-form" onSubmit={handleSubmit}>
        <div className="">
          <div className="">Table Name</div>
          <input
            className="table-form-input"
            onChange={handleChange}
            defaultValue={tableData.table_name}
            type="text"
            id="table_name"
            name="table_name"
            required
          />
        </div>

        <div className="">
          <div className="">Capacity</div>
          <input
            className="table-form-input"
            onChange={changeNumber}
            defaultValue={tableData.capacity}
            type="number"
            id="capacity"
            name="capacity"
            required
          />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default TableForm;
