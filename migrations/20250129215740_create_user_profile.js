/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .table("device", function (table) {
      table.index("uuid", "device_uuid_index");
    })
    .createTable("user_profile", function (table) {
      table.bigincrements("id").primary();
      table.string("user_name", 255).notNullable();
      table.bigInteger("age");
      table.string("gender", 200);
      table.float("height");
      table
        .string("uuid", 255)
        .notNullable()
        .references("uuid")
        .inTable("device");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user_profile")
    .table("device", function (table) {
      table.dropIndex("uuid", "device_uuid_index"); // Remove index if rollback
    });
};
