const jwt = require('jsonwebtoken')
const User = require("../../../models/user")

/**
 * POST /api/auth/register
 * {
 *  username,
 *  password
 * }
 */
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body
        let newUser = await User.findOneByUsername(username)
        
        if (newUser) {
            throw new Error('username exists')
        } else {
            newUser =  User.create(username, password)
        }

        // count the number of the user
        const count = User.count({}).exec()

        // assgn adimin if count is 1
        let isAdmin = false
        if (count === 1) {
            isAdmin = newUser.assignAdmin()
        }

        // resppond to the client
        res.json({
            message: 'registered successfully',
            admin: isAdmin
        })
    } catch(error) {
        res.status(409).json({
            message: error.message
        })
    }
}

/**
 * POST /api/auth/login
 * {
 *  username,
 *  password
 * }
 */
 exports.login = async (req, res) => {
     try {
        const { username, password } = req.body
        const secret = req.app.get('jwt-secret')
   
        // check the user info & generate the jwt
        const user = await User.findOneByUsername(username);
        
        if (!user) {
            throw new Error('User is not exists')
        }
        
        if (user.verify(password)) {
            // create a promise that generates jwt asynchronously.
            const token = jwt.sign({
                _id: user._id,
                username: user.username,
                admin: user.admin
            },
            secret,
            {
                expiresIn: '7d',
                issuer: 'node.com',
                subject: 'userInfo'
            })

            res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 9000000) })
            res.json({
                message: 'logged in successfully',
                result: true
            })
        }   
     } catch(e) {
        res.status(404).json({
            message: e.message
        })
     }
}

/**
 * GET /api/auth/check
 */
exports.check = (req, res) => {
    try {
        res.json({
            success: true,
            info: req.decoded
        })
    } catch(e) {
        res.status(403).json({
            success: false,
            message: e.message
        })
    }
}