var mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  postText: { type: String },
  author: { type: String, ref: 'User' }
})

module.exports = mongoose.model('Post', postSchema);