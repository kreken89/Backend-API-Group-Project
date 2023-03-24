const router = require('express').Router();
const commentModel = require('../models/commentModel')

// Create
router.post('/', commentModel.createNewComment)

// Read
router.get('/', commentModel.getComments)


module.exports = router;