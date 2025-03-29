const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        url: req.originalUrl,
    })
}

module.exports = notFound