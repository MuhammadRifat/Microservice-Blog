import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

