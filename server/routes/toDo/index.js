const express = require('express')
const router = express.Router()
const toDoController = require('../../controllers/toDoController')
const authenticate = require('../../middlewares/authenticate')
const authorize = require('../../middlewares/authorize')

router.use(authenticate)
router.get('/', toDoController.findAll)
router.get('/:id', toDoController.findOne)
router.post('/', toDoController.create)
router.patch('/:id', authorize, toDoController.update)
router.patch('/complete/:id', authorize, toDoController.complete)
router.patch('/uncomplete/:id', authorize, toDoController.unComplete)
router.delete('/:id', authorize, toDoController.delete)

module.exports = router