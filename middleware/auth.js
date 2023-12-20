const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if(authHeader) {
        try {
            //get token 
             const token = authHeader.split(' ')[1]

            //check jwt
            const user = jwt.verify(token, process.env.SECRET )
            req.user = user

        } catch (error) {
            console.log(error)
        }
      
    } 

    return next()
}