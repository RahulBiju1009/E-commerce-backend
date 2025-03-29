const express = require('express');
const userRouter = require('./user')

const router = express.Router()

// Define the routes for the application
// Each route has a path and a corresponding handler
const routes = [
    { path: '/user', handler: userRouter },
]

// Register each route with the router
// This allows the application to handle requests to different paths
routes.forEach((route) => {
    router.use(route.path, route.handler)
})

module.exports = router


