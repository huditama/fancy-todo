const express = require('express')
const router = express.Router()
const user = require('./user')
const toDo = require('./toDo')

router.use('/users', user)
router.use('/toDo', toDo)

module.exports = router