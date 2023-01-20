import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function ChangeDate({ currentDate }) {
  const history = useHistory();

  const resetHandler = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  };

  const backHandler = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(currentDate)}`);
  };

  const forwardHandler = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(currentDate)}`);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn m-1 btn-info"
          onClick={backHandler}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn m-1 btn-info"
          onClick={resetHandler}
        >
          Today
        </button>
        <button
          type="button"
          className="btn m-1 btn-info"
          onClick={forwardHandler}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ChangeDate;
