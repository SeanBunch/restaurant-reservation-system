exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary() // Sets supplier_id as the primary key
        table.string("table_name").notNullable()
        table.integer("capacity").notNullable()
        table.integer("reservation_id").defaultTo(null)
        table
            .foreign("reservation_id")
            .references("reservation_id")
            .inTable("reservations")
            .onDelete("CASCADE")
        table.string("status").notNullable().defaultTo("booked")
        table.timestamps(true, true); // Adds created_at and updated_at columns
      })
}

exports.down = function(knex) {
    return knex.schema.dropTable("tables")
}
