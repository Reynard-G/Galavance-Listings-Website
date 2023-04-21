const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    windowMs: 5000, // 5 seconds
    max: 50, // limit each IP to 50 requests per windowMs
    message: "Too many requests from this IP, please try again after 5 seconds",
});

module.exports = limiter;