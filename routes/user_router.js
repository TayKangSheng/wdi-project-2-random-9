const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

router.get('/login', userController.loginPage)
router.get('/signup', userController.signupPage)

module.exports = router
