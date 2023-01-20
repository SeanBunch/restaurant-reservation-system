import React from "react";
import { useHistory } from "react-router";

function SeatForm({ tables, reservation, changeHandler, submitHandler }) {
  const history = useHistory();
  return (
    <form onSubmit={submitHandler}>
      <div>
        <h2>
          Seat Party {reservation.reservation_id} 
          {/* of {reservation.people}{" "} */}
        </h2>
      </div>
      <div>
        <select name="table_id" id="table-select" onChange={changeHandler}>
          <option value="">- Please choose a table -</option>
          {tables.map((table) => (
            <option value={table.table_id} key={table.table_name}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-info m-2" type="submit">
        Submit
      </button>
      <button className="btn btn-danger m-2" onClick={() => history.push("/")}>
        Cancel
      </button>
    </form>
  );
}

export default SeatForm;
