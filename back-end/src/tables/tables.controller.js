const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

// Validators
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

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const foundTable = await service.readTable(table_id);
  if (foundTable) {
    res.locals.table = foundTable;
    return next();
  }
  next({
    status: 404,
    message: `Table id does not exist: ${table_id}`,
  });
}

async function resExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const foundRes = await service.readReservation(reservation_id);
  if (foundRes) {
    res.locals.reservation = foundRes;
    return next();
  }
  next({
    status: 404,
    message: `Reservation id does not exist: ${reservation_id}`,
  });
}

function validNameCapacity(req, res, next) {
  const { table_name, capacity } = req.body.data;
  if (table_name.length < 2) {
    next({ status: 400, message: "table_name must be at least 2 characters" });
  } else if (capacity < 1 || typeof capacity !== "number") {
    next({
      status: 400,
      message: "Table capacity must be a number 1 or greater",
    });
  } else {
    next();
  }
}

function validTableSeating(req, res, next) {
  const tableStatusInput = res.locals.table.status;
  const tablePeopleInput = res.locals.reservation.people;
  const resStatusInput = res.locals.reservation.status;
  const resCapInput = res.locals.table.capacity;
  if (tableStatusInput == "occupied") {
    next({ status: 400, message: "Table occupied, already in use" });
  } else if (resStatusInput == "seated" || resStatusInput == "finished") {
    next({ status: 400, message: "Party already seated or finished" });
  } else if (resCapInput < tablePeopleInput) {
    next({ status: 400, message: "Table capacity not big enough for party" });
  } else {
    next();
  }
}

function validTableInUse(req, res, next) {
  const tableStatusInput = res.locals.table.status;
  if (tableStatusInput !== "occupied") {
    next({
      status: 400,
      message:
        "Table not occupied or finished. Cannot open table that isn't in use",
    });
  } else {
    next();
  }
}

// service queries
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res, next) {
  const newTable = req.body.data;
  if (newTable.reservation_id) {
    newTable.status = "occupied";
  } else {
    newTable.status = "free";
  }
  const data = await service.create(newTable);
  res.status(201).json({ data: data });
}

async function update(req, res, next) {
  const tableId = res.locals.table.table_id;
  const resId = res.locals.reservation.reservation_id;
  await service.occupyTable(tableId, resId);
  const data = await service.updateReservation(resId, "seated");
  res.status(200).json({ data });
}

async function destroytable(req, res, next) {
  const tableId = res.locals.table.table_id;
  const resId = res.locals.table.reservation_id;
  await service.freeTable(tableId);
  const data = await service.updateReservation(resId, "finished");
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataExists,
    bodyDataHas("table_name"),
    bodyDataHas("capacity"),
    validNameCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    bodyDataExists,
    bodyDataHas("reservation_id"),
    asyncErrorBoundary(resExists),
    validTableSeating,
    asyncErrorBoundary(update),
  ],
  destroy: [
    asyncErrorBoundary(tableExists),
    validTableInUse,
    asyncErrorBoundary(destroytable),
  ],
};
