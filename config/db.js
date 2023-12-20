const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env'})

const connectDB = async () =>  {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB connect')
    } catch (error) {
        console.log('Failed to connect:' + error)
        process.exit(1)
    }
}

module.exports = connectDB