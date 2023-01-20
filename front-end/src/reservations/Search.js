import React, { useState } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import ReservationList from "./ReservationList"
import { listReservations } from "../utils/api"

function Search(){
    const [error, setError] = useState(null)
    const [search, setSearch] = useState({})
    const [reservations, setReservations] = useState([])
  
  
    const changeHandler = (event) => {
      const { target } = event
      const value = target.value
      setSearch({ ...search, [target.name]: value })
    }
  
    const searchHandler = (event) => {
      event.preventDefault()
      const abortController = new AbortController()
      listReservations( search, abortController.signal )
        .then((response)=>setReservations(response))
        .catch(setError)
      return () => abortController.abort()
    }


    return(
        <>
            <ErrorAlert error={error}/>
            <h2>Search Reservations by Phone</h2>
            <div>
                <input
                    className="input-group"
                    name = "mobile_number"
                    type = "text"
                    onChange = {changeHandler}
                    required
                />
                <br/>
                <button className="btn btn-info btn-lg btn-block" type="submit" onClick={searchHandler}>Search</button>
            </div>
            <br/>

            <div>
                {reservations.length !== 0 ? <ReservationList reservations={reservations}/> : `No reservations found with this phone number`}
            </div>

        </>
    )
}

export default Search 