var mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  commentText: { type: String },
  author: { type: String, ref: 'User' },
  // relatedPost: { type: Post, ref: 'Post' },
  // timestamp: { type : Date, default: Date.now }
},{
  timestamps: true
  
})

module.exports = mongoose.model('Comment', commentSchema);