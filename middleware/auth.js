const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            res.redirect('/')
        }

        const decoded = jwt.verify(token, req.app.get('jwt-secret'))

        req.decoded = decoded
        next()
    } catch(e) {
        res.status(403).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = authMiddleware