const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    url: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    original_name: {
        type: 'string',
        required: true
    },
    downloads: {
        type: 'number'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    password: {
        type: 'string',
        default: null
    },
    created: {
        type: 'Date',
        default: Date.now()
    }
})

module.exports = mongoose.model('links', linksSchema)