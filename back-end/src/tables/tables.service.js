const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(tableInfo) {
  return knex("tables")
    .insert(tableInfo)
    .returning("*")
    .then((results) => results[0]);
}

function readTable(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function readReservation(resId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: resId })
    .first();
}

function updateReservation(resId, status) {
  return knex("reservations")
    .where({ reservation_id: resId })
    .update({ status: status });
}

function occupyTable(tableId, resId) {
  return knex("tables")
    .where({ table_id: tableId })
    .update({ reservation_id: resId, status: "occupied" });
}

function freeTable(tableId) {
  return knex("tables")
    .where({ table_id: tableId })
    .update({ reservation_id: null, status: "free" });
}

module.exports = {
  list,
  create,
  readTable,
  readReservation,
  updateReservation,
  occupyTable,
  freeTable,
};
