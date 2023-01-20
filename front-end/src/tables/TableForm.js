import React from "react";
import { useHistory } from "react-router";

function TableForm({ table, changeHandler, submitHandler }) {
  const history = useHistory();
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="table_name">
          Table Name
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="table_name"
          type="string"
          onChange={changeHandler}
          value={table.table_name}
          required
        />
      </div>
      <div>
        <label className="col-sm-3 col-form-label" htmlFor="capacity">
          Capacity
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="capacity"
          type="number"
          onChange={changeHandler}
          value={table.capacity}
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

export default TableForm;
