const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

// validators
function bodyDataExists(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property" });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName] && data[propertyName] !== "") {
      return next();
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    });
  };
}

async function resExists(req, res, next) {
  const { reservation_id } = req.params;
  const foundRes = await service.read(reservation_id);
  if (foundRes) {
    res.locals.reservation = foundRes;
    return next();
  }
  next({
    status: 404,
    message: `Reservation id does not exist: ${reservation_id}`,
  });
}

function validDateTime(req, res, next) {
  const dateInput = req.body.data.reservation_date;
  const timeInput = req.body.data.reservation_time;
  const requestDateTime = new Date(`${dateInput} ${timeInput}`);
  const currentDateTime = new Date();
  const dayInput = new Date(dateInput).getDay();
  if (Number.isNaN(Date.parse(`${dateInput} ${timeInput}`))) {
    next({
      status: 400,
      message:
        "reservation_date and reservation_time must be a date and time formats",
    });
  } else if (requestDateTime < currentDateTime) {
    next({
      status: 400,
      message: "Requested reservation must be in the future",
    });
  } else if (timeInput < "10:30" || timeInput > "20:30" || dayInput == 1) {
    next({
      status: 400,
      message:
        "Requested reservation must be within business hours (10:30-20:30), and closed Mondays",
    });
  } else {
    next();
  }
}

function validPeopleBooked(req, res, next) {
  const peopleInput = req.body.data.people;
  const statusInput = req.body.data.status;
  if (typeof peopleInput !== "number" || peopleInput < 1) {
    next({ status: 400, message: "people must be a number 1 or greater" });
  } else if (statusInput && statusInput !== "booked") {
    next({
      status: 400,
      message: `Reservations in a status other than booked, such as ${statusInput}, cannot be created`,
    });
  } else {
    next();
  }
}

async function validStatus(req, res, next) {
  const { data: { status } = {} } = req.body;
  const reservationStatus = res.locals.reservation.status;

  if (status === "unknown") {
    return next({
      status: 400,
      message: `Invalid status: ${status}`,
    });
  }
  if (reservationStatus === "finished") {
    return next({
      status: 400,
      message: `Invalid status: ${reservationStatus}`,
    });
  }
  next();
}

// service queries

async function list(req, res, next) {
  const date = req.query.date;
  const phone = req.query.mobile_number;
  if (date) {
    const data = await service.list(date);
    res.json({ data });
  } else if (phone) {
    const data = await service.search(phone);
    res.json({ data });
  } else {
    let currentDate = new Date().toJSON().slice(0, 10);
    const data = await service.list(currentDate);
    res.json({ data });
  }
}

async function create(req, res, next) {
  const newRes = req.body.data;
  const data = await service.create(newRes);
  res.status(201).json({ data: data });
}

async function read(req, res, next) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function update(req, res, next) {
  const resId = res.locals.reservation.reservation_id;
  const updatedRes = { ...req.body.data, reservation_id: resId };
  const data = await service.update(updatedRes);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataExists,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validDateTime,
    validPeopleBooked,
    create,
  ],
  read: [asyncErrorBoundary(resExists), read],
  updateRes: [
    asyncErrorBoundary(resExists),
    bodyDataExists,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validDateTime,
    validPeopleBooked,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    bodyDataExists,
    asyncErrorBoundary(resExists),
    asyncErrorBoundary(validStatus),
    asyncErrorBoundary(update),
  ],
};
