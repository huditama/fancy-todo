const { verify } = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        const decoded = verify(req.headers.token, process.env.JWT_SECRET)
        req.authenticatedUser = decoded
        User
            .findOne({ _id: decoded.id })
            .then((findOneUser) => {
                if (findOneUser) next()
                else res.status(401).json({ type: 'AUTHENTICATION ERROR', message: 'You do not have access to this page!' })
            })
    } catch (error) {
        res.status(401).json({ type: 'AUTHENTICATION ERROR', message: 'You do not have access to this page!' })
    }
}