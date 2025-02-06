/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('setting', function (table) {
    table.bigincrements('id').primary();
    table.string('unit', 255);
    table.boolean('dark_mode').defaultTo(false);
    table.string('uuid', 255).notNullable().references('uuid').inTable('device');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('setting');
};
