const Case = require('../schemas/caseSchema');

exports.createNewCase = (req, res) => {

    const { email } = req.body;
    if(!email) {
        res.status(400).json({
            message: 'You need to enter an email'
        })
        return
    }
    Case.create({ email })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when creating the case',
            err: err.message
        })
        return
      })
      
}