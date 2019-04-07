const express = require('express')
const router = express.Router()
const toDoController = require('../../controllers/toDoController')
const authenticate = require('../../middlewares/authenticate')

router.use(authenticate)
router.get('/', toDoController.findAll)
router.post('/', toDoController.create)
router.patch('/complete/:id', toDoController.complete)
router.patch('/uncomplete/:id', toDoController.unComplete)
router.delete('/:id', toDoController.delete)

module.exports = router