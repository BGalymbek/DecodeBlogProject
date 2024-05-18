const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin:Boolean,
    githubid: String
})

module.exports = mongoose.model('user', UserSchema)