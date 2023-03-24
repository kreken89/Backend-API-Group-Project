const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'You need to enter an email'],
    },
    message: {
      type: String,
      required: [true, 'You need to enter a message'],
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Case'
    },
    
  },
  { timestamps: true } // Timestamps: true - gives oss createdAt and updatedAt automatically
); 

module.exports = mongoose.model('Comment', commentSchema)