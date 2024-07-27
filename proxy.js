const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const express = require('express');
const { ROUTES } = require('./route');

const router = express.Router();

ROUTES.forEach(route => {
    router.use(route.url, rateLimit(route.rateLimit), createProxyMiddleware(route.proxy))
})

exports.appRouter = router;