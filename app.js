const express = require('express'); // Importing required modules
const app = express(); // Creating an Express app




// MIDDLEWARE - Configuring the app to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// CONTROLLERS
app.use('/api/cases', require('./controllers/caseController'))

// Exporting the app so it can be used in other modules
module.exports = app;