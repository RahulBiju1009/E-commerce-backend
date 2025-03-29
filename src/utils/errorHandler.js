const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if(!statusCode) statusCode = 500
    if(!message) message = "Something went wrong!"

    res.status(statusCode).json({
        success: false,
        message: message,
    })
}

module.exports = errorHandler