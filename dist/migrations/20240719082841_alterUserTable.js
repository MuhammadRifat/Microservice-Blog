"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('user', (table) => {
        table.string('image').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('user', (table) => {
        table.dropColumn('image');
    });
}
exports.down = down;
//# sourceMappingURL=20240719082841_alterUserTable.js.map