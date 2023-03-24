const router = require('express').Router();
const caseModel = require('../models/caseModel');



// CREATE
router.post('/', caseModel.createNewCase)


// READ
router.get('/', caseModel.getAllCases)
router.get('/statuses', caseModel.getStatuses);
router.get('/:id', caseModel.getCasesById);

// UPDATE
router.put('/:id/', caseModel.updateCase);


// DELETE
router.delete('/:id', caseModel.deleteCase);



module.exports = router;
