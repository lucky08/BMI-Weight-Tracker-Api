/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('weight_date', function (table) {
    table.bigincrements('id').primary();
    table.float('weight');
    table.timestamp('date_time');
    table.bigInteger('user_profile_id').unsigned().references('id').inTable('user_profile');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('weight_date');
};
