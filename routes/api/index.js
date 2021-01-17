const router = require('express').Router()
const auth = require('./auth')
const board = require('./board')

router.use('/auth', auth)
router.use('/board', board)

module.exports = router
