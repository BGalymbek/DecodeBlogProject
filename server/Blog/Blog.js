const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId , ref: 'category'},
    image: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model('blog', BlogSchema)