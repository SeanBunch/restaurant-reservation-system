import React, { useState } from "react"
import { useHistory } from "react-router"
import ReservationForm from "./ReservationForm"
import { newReservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"


function NewReservation(){
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    const [reservation, setReservation] = useState(initialFormState)
    const [error, setError] = useState(null)
    const history = useHistory()

    const changeHandler = (event) => {
        setReservation({ ...reservation, [event.target.name]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        newReservation(reservation, abortController.signal)
            .then(() => {
                history.push(`/dashboard?date=${reservation.reservation_date}`)
            })
            .catch(setError)
        return ( () => abortController.abort() )
    }

    return(
        <>
            <ErrorAlert error={error}/>
            <h2>Create New Reservation</h2>
            <ReservationForm 
                reservation={reservation}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}

export default NewReservation