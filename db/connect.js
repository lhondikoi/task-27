require('dotenv').config()
const mongoose = require('mongoose')

const db = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then(() => console.log("Successfully connected to DB."))
        .catch(e => console.log(e))
}

module.exports = db;