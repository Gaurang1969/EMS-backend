// 1. Import the package
const rateLimit = require('express-rate-limit');

// 2. Define the logic
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

// 3. EXPORT it (Don't use app.use here!)
module.exports = limiter;