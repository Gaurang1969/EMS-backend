const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Custom middleware to prevent spamming
const limiter = require('./middleware/rateLimiter'); 

const app = express();

// 1. Setup for hosting (Render/Vercel) to get real user IPs
app.set('trust proxy', 1); 

// 2. Middleware Pipeline (Order matters for performance)
app.use(limiter);       // Stop bots first
app.use(cors());        // Check if website is allowed
app.use(express.json()); // Handle JSON data

// 3. API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// 4. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ Connection Error"));

// 5. Health Check
app.get('/', (req, res) => {
    res.json({ message: "EMS Server is live" });
});

// 6. Port & Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Running on port ${PORT}`);
});