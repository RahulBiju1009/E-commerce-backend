const signUpUser = (req, res) => {
    res.status(200).json({
        success: true,
        message: "User signed up successfully",
    })
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