/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("device_information", function (table) {
    table.bigincrements("id").primary();

    table.string("uuid", 255).notNullable();
    table.boolean("is_virtual").defaultTo(false);
    table.string("model", 200);
    table.string("operating_system", 200);
    table.string("os_version", 200);
    table.string("platform", 200);
    table.string("web_view_version", 200);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("device_information");
};
