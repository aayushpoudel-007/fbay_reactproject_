const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected to the database")
    })
}

module.exports = connectDB;