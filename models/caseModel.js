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
  Case.create({ email, subject, message, status: { _id: 1, statusName: 'Ej påbörjad' } })    // If the requested properties (email, subject, message) is present, it creates a new case with the email, it will also include the status field automatically with default status 1 "Ej påbörjad" on all cases
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



// Function to GET one specific cases
exports.getCasesById = (req, res) => {
  Case.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Something went wrong when trying to get the specific cases',
      });
    });
};

//Gör en delete med id

exports.deleteCase = (req, res) => {

  Case.findByIdAndDelete(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: 'Could not find the specific case'
        })
        return
      }
      //returnerar id om vi vill använda den för front end
      res.status(200).json({
        id: data._id
      })

    })

    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong'
      })
    })

}


//Update status on case
exports.updateCase = (req, res) => {
  const { statusId } = req.body;
  if (!statusId) {
    res.status(400).json({
      message: 'You need to enter a new status'
    })
    return
  }

  // Define a variable for the statusName
  let statusName;

  // Use a switch statement to set the statusName based on the statusId
  switch (statusId) {
    case 1:
      statusName = 'Ej påbörjad';
      break;
    case 2:
      statusName = 'Pågående';
      break;
    case 3:
      statusName = 'Avslutad';
      break;
    default:
      // Return an error if an invalid statusId is provided
      res.status(400).json({
        message: 'Invalid status ID (1, 2, 3 accepted)'
      });
      return;
  }

  // Use the Case model to find and update the case with the provided id
  Case.findByIdAndUpdate(req.params.id, { 'status._id': statusId, 'status.statusName': statusName }, { new: true })
    .then(Case => {
      if (!Case) {
        res.status(404).json({
          message: 'Could not find that case'
        })
        return
      }
      res.status(200).json(Case)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong when updating the case status',
        err: err.message
      })
    })
}


//Get all statuses available  (http://localhost:9999/api/cases/statuses)
exports.getStatuses = (req, res) => {
  const statuses = [
    { statusId: 1, statusName: 'Ej påbörjad' },
    { statusId: 2, statusName: 'Pågående' },
    { statusId: 3, statusName: 'Avslutad' }
  ];
  res.status(200).json(statuses);
};



