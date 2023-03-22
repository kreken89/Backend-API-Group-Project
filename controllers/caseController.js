const router = require('express').Router();
const caseModel = require('../models/caseModel');



// CREATE
router.post('/', caseModel.createNewCase)


// READ
router.get('/', caseModel.getAllCases)
router.get('/:id', caseModel.getCasesById);


// UPDATE



// DELETE



module.exports = router;
