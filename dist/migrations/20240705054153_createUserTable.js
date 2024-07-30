"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary();
        table.string('firstName').nullable();
        table.string('lastName').nullable();
        table.string('email').nullable();
        table.string('slug').nullable();
        table.string('password').nullable();
        table.boolean('isVerified').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.dateTime('deletedAt').nullable().defaultTo(null);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('user');
}
exports.down = down;
//# sourceMappingURL=20240705054153_createUserTable.js.map