const mongoose = require('mongoose'); // Import the Mongoose package to interact with MongoDB

// Define the schema for a "case" document
const caseSchema = mongoose.Schema(
  {
    // _id:{ 
    //   type: mongoose.Schema.Types.ObjectId 
    // },
    email: {
      type: String,
      required: [true, 'You need to enter an email'],
    },
    subject: {
      type: String,
      required: [true, 'You need to enter a subject'],
    },
    message: {
      type: String,
      required: [true, 'You need to enter a message'],
    },
    status: {
            _id: {
            type: Number,
            default: 1,
          },
          statusName: {
              type: String,
              required: true,
            },
    },
    comments: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment' 
    }]
  },
  { timestamps: true } // Timestamps: true - gives oss createdAt and updatedAt automatically
); 



const commentSchema = mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Case'
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

module.exports = mongoose.model('Case', caseSchema); // Export the model based on the schema, to be used in other parts of the application
module.exports = mongoose.model('Comment', commentSchema)

