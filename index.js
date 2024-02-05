const express = require('express');
const db = require('./db/connect');
const studentRoutes = require('./routes/students.routes.js')
const mentorRoutes = require('./routes/mentors.routes.js')

// initialize app
const app = express()

// connect to db
db();

// add middleware for parsing JSON
app.use(express.json());

// add routes
app.use('/api/v1', studentRoutes)
app.use('/api/v1', mentorRoutes)


app.listen(3000, ()=> {
    console.log('Server running on port 3000')
})