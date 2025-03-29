require('dotenv').config()
const express = require('express');
const connectDatabase = require('./src/config/database')

const app = express()

app.use(express.json())

connectDatabase()
    .then(() => {
        console.log('Database connected')
        app.listen(process.env.DEV_PORT, () => {
            console.log(`Server is running on port ${process.env.DEV_PORT}`)
        })
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    })