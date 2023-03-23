const mongoose = require('mongoose'); // Import the Mongoose package to interact with MongoDB

// Define the schema for a "case" document
const caseSchema = mongoose.Schema(
  {
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
      type: Number,
      default: 1,
    },
    comments: [{
      case: String,
      message: String,
      email: String,
      createdAt: {
        type: Date,
      }
    }]
  },
  { timestamps: true }
);


module.exports = mongoose.model('Case', caseSchema); // Export the model based on the schema, to be used in other parts of the application

