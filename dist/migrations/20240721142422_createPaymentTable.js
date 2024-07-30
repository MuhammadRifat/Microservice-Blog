"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('payment', function (table) {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.string('blogId').nullable();
        table.string('transactionId').nullable();
        table.string('paymentStatus').nullable();
        table.string('paymentGateway').nullable();
        table.json('paymentGatewayResponse').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.dateTime('deletedAt').nullable().defaultTo(null);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('payment');
}
exports.down = down;
//# sourceMappingURL=20240721142422_createPaymentTable.js.map