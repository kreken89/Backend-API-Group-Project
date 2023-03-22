// Importing required modules
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

// Setting up port and server URL
const PORT = process.env.PORT || 8888;
const serverURI = `http://localhost:${PORT}`;

const mongoURI = process.env.MONGO_URI; // Getting MongoDB URI from environment variables

app.listen(PORT, () => console.log('Server running on: ' + serverURI)); // Starting the server and listening to the specified port

// Function to connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to DB');
  } catch (err) {
    console.log(err);
  }
};
connectToDB(); //Connecting to MongoDB
