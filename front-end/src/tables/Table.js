import React from "react"
import { removeReservation } from "../utils/api"

function Table({table_id, table_name, capacity, reservation_id, setTablesError, loadDashboard}){
    const finishHandler = (event) => {
        let table_id = event.target.value
        const pop = "Is this table ready to seat new guests?"
        if (window.confirm(pop) === true) {
            removeReservation(table_id)
                .then(() => loadDashboard())
                .catch((error) => console.log("error", error));
        }
      }

    return(
        <div className="card mb-3" key={reservation_id}>
            <div className="card-body">
                <p className="card-text">Table Name: {table_name}</p>
                <p>Table Id: {table_id}</p>
                <p>Capacity: {capacity}</p>
                <p>
                    <span data-table-id-status={table_id}>
                    Status: {reservation_id ? "Occupied" : "Free"}
                    </span>
                </p>
                {reservation_id ? (
                    <button
                    className="btn btn-danger"
                    value={table_id}
                    data-table-id-finish={table_id}
                    onClick={finishHandler}
                    >Finish</button>) : null
                }
            </div>
        </div>
    )
}

export default Table