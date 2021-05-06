const Post = require('../models/post');
const mongoose = require('mongoose');


module.exports = (app) => {

  app.get('/', (req, res) => {
      const currentUser = req.cookies.nToken
      console.log(req.cookies.nToken)
      Post.find({}).lean()
        .then(posts => {
          res.render('posts-index', { posts, currentUser });
        })
        .catch(err => {
          console.log(err.message);
        })
  })

  app.get('/posts/new', (req, res) => {
    const currentUser = req.cookies.nToken
    res.render('posts-new', {currentUser})
  })

  // CREATE
  app.post('/posts/new', (req, res) => {
    const currentUser = req.cookies.nToken
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });


  app.get("/posts/:id", function(req, res) {
    const currentUser = req.cookies.nToken
    // LOOK UP THE POST
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
      res.render('posts-show', { post, currentUser })
    }).catch((err) => {
      console.log(err.message)
    })
    // Post.findById(req.params.id).lean()
    //   .then(post => {
    //     res.render("posts-show", { post });
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    const currentUser = req.cookies.nToken
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
    });
}
