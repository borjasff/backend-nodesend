const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})
const { validationResult } = require('express-validator')

exports.authUser = async (req, res, next) => {

    //check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


        //search user to check  if he is registered
        const {email, password} = req.body
        const user = await User.findOne({email})
        //console.log(user)

        if(!user){
            res.status(401).json({msg: "User not found"})
            return next()
        }

        //verify password and authentication the user
        if(bcrypt.compareSync(password, user.password)){
            //create jwt
            const token = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email,
            }, process.env.SECRET, {
                expiresIn: '8h'
            })
            res.json({token})
        } else {
            res.status(401).json({msg: "Password incorrect"})
            return next()
        }

}

exports.UserAuthed = async (req, res, next) => {
    
    res.json({user: req.user})
}