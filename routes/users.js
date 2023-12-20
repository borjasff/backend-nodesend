const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Add a valid password with a minimum of 6 characters.').isLength({min: 6})
    ],
    userController.newUser
)

module.exports = router