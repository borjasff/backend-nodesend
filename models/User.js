const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: 'string',
        required: true,
         unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    password: {
        type: 'string',
        required: true,
        trim: true
    }
})
//model of users
module.exports = mongoose.model('User', userSchema)