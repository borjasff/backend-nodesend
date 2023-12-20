const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

exports.newUser = async (req,res) => {

    //check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    //verify that the user already exists
    const {email, password} = req.body;
    let userVerify = await User.findOne({email});

    if(userVerify){
        return res.status(400).json({msg: "User already exists"})
    }


    //create new user
    const user = new User(req.body)
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    try {
        await user.save()
        res.json({ msg: 'User created successfully'})

    } catch (error) {
        console.log(error)
    }
    
}