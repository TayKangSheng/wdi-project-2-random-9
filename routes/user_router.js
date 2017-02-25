const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const authenticate = require('../authenticate')

router.get('/login', userController.loginPage)
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/profile', authenticate.isNotLoggedIn, userController.profile)

module.exports = router
