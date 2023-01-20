import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import SeatForm from "./SeatForm";
import { listTables, updateTable } from "../utils/api";

function SeatReservation() {
  const res = useParams();
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState({
    reservation_id: res.reservation_id,
  });
  const history = useHistory();
  const changeHandler = (event) => {
    setCurrentTable({
      ...currentTable,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateTable(res.reservation_id, currentTable.table_id, currentTable)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(setError);
    return () => abortController.abort();
  };

  useEffect(() => {
    async function loadTables() {
      const response = await listTables();
      setTables(response);
    }
    loadTables();
  }, []);

  return (
    <>
      <ErrorAlert error={error}/>
      <h2>Seat Table</h2>
      <SeatForm
        tables={tables}
        reservation={res}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default SeatReservation;
