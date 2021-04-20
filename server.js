const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');
const port = 3800

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


// Use Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Set db
const db = require('./data/reddit-db');
const mongoose = require("mongoose");


// Import Post Controller 
const posts_controller = require('./controllers/posts.js');
const comments_controller = require('./controllers/comments.js');
const Post = require('./models/post');
const Comment = require('./models/comment');

app.get('/', (req, res) => {
  res.render('home');
})

app.post('/', (req, res) => {
  Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})


app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})


app.post('/posts/new', (req, res) => {
  // LOOK UP THE POST
  Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})

// posts_controller.new_post

app.get("/posts/:id", function(req, res) {
  // LOOK UP THE POST
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
      res.render('posts-show', { post })
    }).catch((err) => {
      console.log(err.message)
    })
    // Post.findById(req.params.id).lean()
    // .then(post => {
    //   res.render("posts-show", { post });
    // })
    // .catch(err => {
    //   console.log(err.message);
    // });
  }
  
});

  // SUBREDDIT
app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
});

// CREATE Comment
app.post("/posts/:postId/comments", function(req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      res.redirect(`/`);
    })
    .catch(err => {
      console.log(err);
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;