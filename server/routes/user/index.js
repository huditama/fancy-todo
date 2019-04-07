const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

router.get('/', userController.findAll)
router.post('/', userController.create)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/googleSignIn', userController.googleSignIn)

module.exports = router
