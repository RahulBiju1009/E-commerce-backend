const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { getUserByEmail, getUserByUserName } = require('../utils')
const { validateFirstName, 
        validateLastName, 
        validateUserName,  
        validateEmail, 
        validatePassword, 
        validatePhone } = require('../utils/validations')

const signUpUser = async (req, res, next) => {
    try {
        const { first_name, last_name, user_name, email, password, phone } = req.body
        // validating required fields
        if (!first_name || !user_name || !email || !password) {
            throw new Error('Please fill all required fields')
        }
        const validate = {
            first_name: validateFirstName(first_name),
            last_name: validateLastName(last_name),
            user_name: validateUserName(user_name),
            email: validateEmail(email),
            password: validatePassword(password),
            phone: validatePhone(phone),
        }
        // validating all field values
        for (const key in validate) {
            if (!validate[key]) {
                throw new Error(`Invalid field, please check input values for all fields`)
            }
        }
        // hashing password for safety
        const hashedPassword = await bcrypt.hash(password, 10)
        // validating if user already exists
        const emailExist = await getUserByEmail(User, email)
        const userNameExist = await getUserByUserName(User, user_name)
        if (emailExist || userNameExist) {
            throw new Error('User already exists')
        }
        const user = await User.create({
            first_name,
            last_name,
            user_name,
            email,
            password: hashedPassword,
            phone
        })
        await user.save()
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { user_name, password } = req.body
        if (!user_name || !password) {
            throw new Error('Please fill all required fields')
        }
        const user = await getUserByUserName(User, user_name)
        if (!user) {
            throw new Error('User not found')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid credentials')
        }
        // removing password field from response data
        const { password: _, ...userData } = user.toObject()
        const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY, { expiresIn: '20m' })
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: token
        })
    } catch (error) {
        next(error)
    }
}

// Testing authnetication and authorization middleware
const test = async (req, res, next) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user) {
            throw new Error('User not found or authentication required')
        }
        res.status(200).json({
            success: true,
            message: `User is ${user.first_name} ${user.last_name}`,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUpUser,
    loginUser,
    test
}