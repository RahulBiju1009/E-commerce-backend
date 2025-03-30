const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
    },
    last_name: {
        type: String,
    },
    user_name: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, 'Username must be at least 6 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required, should be unique and valid'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    phone: {
        type: String,
        match: /^[0-9]{10}$/,
    },
}, {
    timestamps: true,
    versionKey: false, // disbales _v field
})

const User = mongoose.model('User', userSchema)

module.exports = User