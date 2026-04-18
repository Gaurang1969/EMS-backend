// importing express package
const express = require('express')

// importing cors package
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
// creating express app
const app = express()

// allowing frontend to talk to backend
app.use(cors())

// allowing JSON data
app.use(express.json())
// Connecting to the Database using your MONGO_URI variable
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch(err => console.log("❌ Connection Error:", err));
// test route to check server is working
app.get('/', (req, res) => {
    res.send("EMS Server is running with established database connection!")
})
// This checks the environment first, then defaults to 5000 if nothing is found
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});