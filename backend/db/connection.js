const mongoose = require('mongoose')

const connectToDb = (url) => {
    mongoose.connect(
        url
    )
    console.log("connection to database has been established successfully")
}

module.exports = connectToDb