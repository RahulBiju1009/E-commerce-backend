const mongoose = require('mongoose')

const connectDatabase = async () => {
   await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
}

module.exports = connectDatabase