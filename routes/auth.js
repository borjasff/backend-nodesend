const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post('/', 
[
    check('email', "Add a valid email").isEmail(),
    check('password', "Password required").not().isEmpty(),
],
authController.authUser)

router.get('/',auth, authController.UserAuthed)


module.exports = router