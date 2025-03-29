require('dotenv').config()
const express = require('express');
const connectDatabase = require('./src/config/database')
const router = require('./src/routes')
const errorHandler = require('./src/utils/errorHandler')
const notFound = require('./src/utils/notFound')

const app = express()

app.use(express.json()) // to parse JSON bodies
app.use('/api',router) // api is the base url for all routes


app.use(notFound) // 404 error handler
app.use(errorHandler) // general error handler


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