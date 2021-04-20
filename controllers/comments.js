const mongoose = require('mongoose');
const Comment = require('../models/comment');

module.exports.new_comments = (req, res, next) => {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(comment => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
    .catch(err => {
      console.log(err);
    });
  
}