const Comment = require('../schemas/commentSchema')
const Case = require('../schemas/caseSchema')

exports.createNewComment = (req, res) => {

  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: 'You need to enter an email',
    });
    return;
  }

  const { caseId } = req.body;
  if (!caseId) {
    res.status(400).json({
      message: 'You need to enter an ID',
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

Comment.create({ email, message, caseId })
  .then((comment) => {
    Case.findById(caseId)
      .then((data) => {
        data.comments.push(comment._id);
        return data.save();
      })
      .then(() => {
        res.status(201).json(comment);
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Something went wrong when creating the comment',
          err: err.message,
        });
      });
  })
}

exports.getComments = (req, res) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json(comments)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong when getting comments',
      })
    })
}