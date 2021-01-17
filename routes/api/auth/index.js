const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('../../../middleware/auth')


router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/check', authMiddleware, controller.check)
module.exports = router
 