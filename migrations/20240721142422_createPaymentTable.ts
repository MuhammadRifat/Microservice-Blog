import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('payment');
}

