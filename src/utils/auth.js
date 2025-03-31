const jwt = require('jsonwebtoken')

// Authentication logic
const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Authorization header is missing or invalid')
        const token = authHeader.split(' ')[1]
        if(!token) throw new Error('No token provided')
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decodedToken.id) throw new Error('Invalid token')
        req.userId = decodedToken.id
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next(error);
    }
}

module.exports = checkToken