import React, { useState } from "react";
import "./tableform.css"
function TableForm({handleChange, changeNumber, tableData, edit}) {
  return (
    <form className="table-form">
        <div className="table-form-input-container">
          <div className="table-form-input-icon">Table</div>
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

        <div className="table-form-input-container">
          <div className="table-form-input-icon">Capacity</div>
          <input
            className="table-form-input"
            onChange={changeNumber}
            defaultValue={tableData.capacity}
            type="number"
            id="capacity"
            name="capacity"
            required
          />
      </div>
      {edit ? <></>:<button className="table-form-submit-button" type="submit">Submit</button>}
    </form>
  );
}

export default TableForm;
