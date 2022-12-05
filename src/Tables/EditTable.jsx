import React from "react";
import TableForm from "./TableForm";
import "./edittable.css"
function EditTable({ tableData, setTableData}) {
  

  const changeHandler = ({ target }) => {
    setTableData({ ...tableData, [target.name]: target.value });
  };
  const changeNumber = ({ target }) => {
    setTableData({ ...tableData, [target.name]: Number(target.value) });
  };
  return (
    <div className="update-table-container">
      <h5>Edit Table:</h5>
      <TableForm
        tableData={tableData}
        handleChange={changeHandler}
        changeNumber={changeNumber}
      />
    </div>
  );
}

export default EditTable;
