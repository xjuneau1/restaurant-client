import React from 'react'
import { updateTable } from '../utils/api';
import TableForm from './TableForm';
function EditTable({tableData, setTableData, setError, handleSetTable}) {
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
        <TableForm
            tableData={tableData}
            handleChange={changeHandler}
            handleSubmit={handleUpdateTable}
            changeNumber={changeNumber}
          />
     );
}

export default EditTable;