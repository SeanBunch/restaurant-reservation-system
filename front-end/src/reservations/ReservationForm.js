import React from "react";
import { useHistory } from "react-router";

function ReservationForm({ reservation, changeHandler, submitHandler }) {
  const history = useHistory();
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="first_name">
          First Name
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="first_name"
          type="string"
          id="first_name"
          onChange={changeHandler}
          value={`${reservation.first_name}`}
          required
        />
      </div>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="last_name">
          Last Name
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="last_name"
          type="string"
          id="last_name"
          onChange={changeHandler}
          value={`${reservation.last_name}`}
          required
        />
      </div>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="mobile_name">
          Phone
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="mobile_number"
          type="tel"
          id="mobile_number"
          onChange={changeHandler}
          value={`${reservation.mobile_number}`}
          required
        />
      </div>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="reservation_date">
          Date
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="reservation_date"
          type="date"
          id="reservation_date"
          onChange={changeHandler}
          value={`${reservation.reservation_date}`}
          required
        />
      </div>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="reservation_time">
          Time
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="reservation_time"
          type="time"
          id="reservation_time"
          onChange={changeHandler}
          value={`${reservation.reservation_time}`}
          required
        />
      </div>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="people">
          Party Size
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="people"
          type="number"
          id="people"
          onChange={changeHandler}
          value={`${reservation.people}`}
          required
        />
      </div>
      <br />

      <button className="btn btn-info btn-lg btn-block" type="submit">
        Submit
      </button>
      <button
        className="btn btn-danger btn-lg btn-block"
        onClick={() => history.go(-1)}
      >
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;
