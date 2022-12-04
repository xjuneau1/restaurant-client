import React from 'react';
import { deleteTable } from "../utils/api"
function DeleteTableButton({table, handleSetTable, setError}) {
    const handleDeleteTable = async () => {
        const abortController = new AbortController();
        try {
          if (
            window.confirm(
              "Delete this table?\n\n You will not be able to undo this."
            )
          ) {
            await deleteTable(table.table_id, abortController.signal);
            handleSetTable();
          }
        } catch (err) {
          setError(err);
        }
      };
    return ( <button onClick={handleDeleteTable}>Delete</button> );
}

export default DeleteTableButton;