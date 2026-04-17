// importing express package
const express = require('express')

// importing cors package
const cors = require('cors')

// creating express app
const app = express()

// allowing frontend to talk to backend
app.use(cors())

// allowing JSON data
app.use(express.json())

// test route to check server is working
app.get('/', (req, res) => {
    res.send("EMS Server is running!")
})

// starting server on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000!")
})