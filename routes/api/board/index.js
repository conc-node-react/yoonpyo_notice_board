const router = require('express').Router()
const controller = require('./board.controller')
const authMiddleware = require('../../../middleware/auth')

// add auth middleware in router.
router.use(authMiddleware)

router.post('/write', controller.write)

router.get('/', controller.list)

router.get('/:id', controller.read)

module.exports = router
