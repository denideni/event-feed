var mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  postText: { type: String },
  author: { type: String, ref: 'User' },
  // timestamp: { type : Date, default: Date.now }
},{
  timestamps: true
  
})

module.exports = mongoose.model('Post', postSchema);