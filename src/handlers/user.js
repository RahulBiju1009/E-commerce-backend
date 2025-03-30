const bcrypt = require('bcrypt')
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

const testError = (req, res, next) => {
    try {
        throw new Error("This is a test error")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUpUser,
    testError
}