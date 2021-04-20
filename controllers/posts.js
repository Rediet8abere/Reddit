const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports.new_post = (req, res, next) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.url,
    summary: req.body.summary
  })

  // SAVE INSTANCE OF POST MODEL TO DB
  newPost.save().then(result => {
    console.log(result)
  })
  .catch(err => console.log(err))
  res.status(201).json({
    message: 'Handling POST requests to /posts/new',
    createdPost: newPost
  })

//   post.save((err, post) => {
//     // REDIRECT TO THE ROOT
//     return res.redirect(`/`);
//  })
}
   