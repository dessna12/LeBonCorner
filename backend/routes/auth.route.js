const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const validate = require('../validators/validator.middleware')
const authSchema = require('../validators/auth.schema')


router.post('/login', authController.login)
router.post('/register', validate(authSchema.register), authController.register)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout);
router.post('/reset-password', validate(authSchema.resetPassword), authController.resetPassword)
router.post('/forgot-password', validate(authSchema.forgotPassword), authController.forgotPassword)

module.exports = router;