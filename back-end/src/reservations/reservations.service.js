const knex = require("../db/connection");

function search(phone) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${phone.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function create(newRes) {
  return knex("reservations")
    .insert(newRes)
    .returning("*")
    .then((results) => results[0]);
}

function read(res_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: res_id })
    .first();
}

function update(updatingRes) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatingRes.reservation_id })
    .update(updatingRes, "*")
    .then((results) => results[0]);
}

module.exports = {
  search,
  list,
  create,
  read,
  update,
};
