const express = require('express');
const { signUpUser, testError } = require('../handlers/user')

const userRouter = express.Router()

userRouter
.post('/signUp', signUpUser)
.get('/testError', testError)

module.exports = userRouter