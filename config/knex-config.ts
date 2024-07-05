import * as dotenv from 'dotenv';
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
      // timezone: 'UTC',
      dateStrings: true,
    },
  },
};

export default knexConfig;
