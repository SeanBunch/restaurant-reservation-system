import React, { useEffect, useState } from "react"
import { listReservations, listTables } from "../utils/api"
import ReservationList from "../reservations/ReservationList"
import TableList from "../tables/TableList"
import ErrorAlert from "../layout/ErrorAlert"
import ChangeDate from "./ChangeDate"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort()
  }

  return (
    <main className="main">
      
      <h1>Dashboard</h1>
      <div>
        <h4>Date selection</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ChangeDate currentDate={date} />
      
      <div>
        <h2>Reservations on {date}</h2>
        <ReservationList 
          reservations={reservations}
          loadDashboard = {loadDashboard}
        />
      </div>

      <div>
        <h2>Table Availability</h2>
        {!tables && <h5 className="load-message">Loading...</h5>}
          <ErrorAlert error={tablesError}/>
          <TableList 
            tables={tables}
            setTablesError={setTablesError}
            loadDashboard={loadDashboard} 
          />
      </div>
    </main>
  )
}

export default Dashboard
