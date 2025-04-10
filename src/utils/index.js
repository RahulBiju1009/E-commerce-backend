const getUserByEmail = async (model, email) => {
    const user = await model.findOne({ email })
    return user
}

const getUserByUserName = async (model, user_name) => {
    const user = await model.findOne({ user_name }).select('+password') // added password to do login validation
    return user
}

module.exports = {
    getUserByEmail,
    getUserByUserName,
}