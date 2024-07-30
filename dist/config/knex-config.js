"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const knexConfig = {
    config: {
        client: process.env.DB_CLIENT,
        useNullAsDefault: true,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            dateStrings: true,
        },
    },
};
exports.default = knexConfig;
//# sourceMappingURL=knex-config.js.map