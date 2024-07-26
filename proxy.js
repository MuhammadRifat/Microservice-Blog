const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');

const setupProxies = (app, routes) => {
    routes.forEach(route => {
        app.use(route.url, rateLimit(route.rateLimit), createProxyMiddleware(route.proxy))
    })
}

exports.setupProxies = setupProxies;