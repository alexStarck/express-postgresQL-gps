const Router = require('express').Router;
const router = new Router()
const userController = require('../controller/user.controller')


router.post('/user', userController.createUser)
router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getUserById)


module.exports = router