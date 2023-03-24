const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    caseId: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: [true, 'You need to enter an email'],
    },
    message: {
      type: String,
      required: [true, 'You need to enter a message'],
    },

  },
  { timestamps: true } // Timestamps: true - gives oss createdAt and updatedAt automatically
); 

module.exports = mongoose.model('Comment', commentSchema)