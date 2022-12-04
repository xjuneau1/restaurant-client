import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import NewTable from "./NewTable";
import { listTables } from "../utils/api";
import "./tables.css"
function Tables() {
  const [tables, setTables] = useState([]);
  const [create, setCreate] = useState(false)
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      try {
        setTables(await listTables(abortController.signal))
        setError(null)
      } catch (err) {
        setError(err);
        return () => abortController.abort();
      }
    }
    loadTables();
  }, [tables]);

  const showCreate = () => {
    create === false ? setCreate(true): setCreate(false)
  }
  if(tables.length){
    return (
      <div className="tables-container">
        {error ? <div>{error.message}</div>: <div className="tables-error"></div>}
        {create ? <NewTable showCreate={showCreate} /> : <></>}
        <button onClick={showCreate}>Create New Table</button>
        {tables.sort((a,b)=> a.table_name > b.table_name ? 1:-1).map((table) => (
          <TableCard key={table.table_id} table={table} setError={setError} />
        ))}
      </div>
    );
  }
}

export default Tables;
