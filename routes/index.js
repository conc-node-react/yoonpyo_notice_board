const router = require('express').Router()
const authMiddleware = require('../middleware/auth')

// main
router.get('/', (req, res) => {
    if (req.decoded) {
        res.render('list', {root: __dirname})
    }

    res.render('index', {root: __dirname})
});

// main
router.get('/join', (req, res) => {
    if (req.decoded) {
        res.render('list', {root: __dirname})
    }

    res.render('join', {root: __dirname})
});

// main
router.get('/list', authMiddleware,  (req, res) => 
    res.render('list', {root: __dirname})
);

// main
router.get('/post/:id', authMiddleware, (req, res) => 
    res.render('post', {root: __dirname, id: req.params.id })
);

// main
router.get('/write', authMiddleware, (req, res) => 
    res.render('write', {root: __dirname, id: req.params.id })
);

// main
router.get('/logout', authMiddleware, (req, res) => {
    const token = ''
    res.cookie('token', token, { httpOnly: true, expires: new Date() })
    res.redirect('/')
});

module.exports = router
