const { verify } = require('../helpers/jwt')
const ToDo = require('../models/toDo')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    ToDo
        .findOne({ _id: req.params.id })
        .populate('UserId')
        .then((findOneToDo) => {
            if (findOneToDo.UserId.email === decoded.email) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}