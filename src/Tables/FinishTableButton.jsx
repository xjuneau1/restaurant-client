import React from "react";
import { finishTableReservation, updateReservationStatus } from "../utils/api";

function FinishTableButton({ table, setError, error, reservation, setReservation }) {
  const handleFinishTable = async () => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Is this table ready to seat new guests?\n\n This cannot be undone."
        )
      ) {
        await updateReservationStatus(
          "finished",
          reservation.reservation_id,
          abortController.signal
        );
        await finishTableReservation(table.table_id, abortController.signal);
        setReservation({})
      }
    } catch (err) {
      setError(err);
      console.log(error)
    }
  };
  return <button onClick={handleFinishTable}>Finish</button>;
}

export default FinishTableButton;
