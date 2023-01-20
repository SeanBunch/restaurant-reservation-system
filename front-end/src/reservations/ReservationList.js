import React from "react"
import Reservation from "./Reservation"


function ReservationList({ reservations, loadDashboard }){
    return(
        <div>
            {reservations.map((res) => (
                <div key={`${res.reservation_id} ${res.first_name}`}>
                    <Reservation 
                        reservation_id={res.reservation_id}
                        first_name={res.first_name}
                        last_name={res.last_name}
                        mobile_number={res.mobile_number}
                        reservation_date={res.reservation_date}
                        reservation_time={res.reservation_time.slice(0, 5)}
                        people={res.people}
                        status={res.status}
                        loadDashboard={loadDashboard}
                    />
                </div>
            ))}
        </div>
    )
}


export default ReservationList