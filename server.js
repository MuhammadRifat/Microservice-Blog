const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { ROUTES } = require('./route');
const morgan = require('morgan');
const cors = require('cors');
const { appRouter } = require('./proxy');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('short'));

// use app routers
app.use(appRouter);

app.listen(port, () => {
    console.log(`Api Gateway running on the port: ${port}`);
});
