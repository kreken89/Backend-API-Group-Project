const Case = require('../schemas/caseSchema');                  // This code exports a function that creates a new case with an email address. // It requires the caseSchema module, which is located in a parent directory.

// Function to POST a new case
exports.createNewCase = (req, res) => {                         // This function expects a request object and a response object as arguments. It destructures the email property from the request body.

  const { email } = req.body;
  if (!email) {                                                 // If the email property is not present, it returns a 400 status code and a message.
    res.status(400).json({
      message: 'You need to enter an email',
    });
    return;
  }
  const { subject } = req.body;
  if (!subject) {                                                 
    res.status(400).json({
      message: 'You need to enter a subject',
    });
    return;
  }
  const { message } = req.body;
  if (!message) {
    res.status(400).json({
      message: 'You need to enter a message',
    });
    return;
  }
  Case.create({ email, subject, message })                       // If the requested properties (email, subject, message) is present, it creates a new case with the email.
    .then((data) => {
      res.status(201).json(data);                                // If the case creation is successful, it returns a 201 status code and the case data.
    })
    .catch((err) => {                                            // If there is an error creating the case, it returns a 500 status code and an error message.
      res.status(500).json({
        message: 'Something went wrong when creating the case',
        err: err.message,
      });
      return;
    });
};

// Function to GET all cases
exports.getAllCases = (req, res) => {
  Case.find()                                                           // find all instances of the "Case" model in the database
    .then((cases) => {                                                  // once the instances are found...
      res.status(200).json(cases);                                      // return a JSON response with a success status code (200) and the instances found
    })
    .catch((err) => {                                                   // if there's an error during the search...
      res.status(500).json({                                            // return a JSON response with an error status code (500) and an error message
        message: 'Something went wrong when trying to get all the cases',
      });
    });
};
