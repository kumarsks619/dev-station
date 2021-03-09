const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        // retrieving the token from the headers
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ msg: 'No token, Authorization denied' })
        }

        // verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // authorizing the request
        req.user = decoded.user

        next()
    } catch (err) {
        if (err.message == "Cannot read property 'split' of undefined") {
            return res.status(401).json({ msg: 'No token, Authorization denied' })
        }
        return res.status(401).json({ msg: 'Invalid/Expired Token' })
    }
}

module.exports = auth
