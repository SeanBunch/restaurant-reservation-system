import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservation, readReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const [reservation, setReservation] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const reservation_id = useParams().reservation_id;
 
  const changeHandler = (event) => {
    setReservation({ ...reservation, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateReservation(reservation)
      .then(() => {
        history.push(
          `/dashboard?date=${reservation.reservation_date.slice(0, 10)}`
        );
      })
      .catch(setError);
    return () => abortController.abort();
  };

  useEffect(() => {
    async function loadReservation() {
      const response = await readReservation(reservation_id);
      setReservation(response);
    }
    loadReservation();
  }, [reservation_id]);

  return (
    <>
      <ErrorAlert error={error}/>
      <h2>Edit Reservation</h2>
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default EditReservation;
