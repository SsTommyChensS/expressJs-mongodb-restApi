const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        default: ''
    }, 
    password: {
        required: true,
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    information: {
        fullname: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: 'male'
        }, 
        age: {
            type: Number,
            default: 18
        },
        address: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    }
})

module.exports = mongoose.model('User', userSchema)