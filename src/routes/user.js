const express = require('express');
const { signUpUser, loginUser, test } = require('../handlers/user');
const checkToken = require('../utils/auth');

const userRouter = express.Router()

userRouter
.post('/signUp', signUpUser)
.post('/login', loginUser)
.get('/test', checkToken, test)

module.exports = userRouter