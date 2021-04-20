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

//Import the mongoose module
const mongoose = require('mongoose');

// Import Post Controller 
const posts_controller = require('./controllers/posts.js');

console.log(posts_controller)


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

app.post('/posts/new', posts_controller.new_post)



app.post('/create/posts', (req, res, next) => {
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.url,
    summary: req.body.summary
  })

  newPost.save().then(result => {
    console.log(result)
  })
  .catch(err => console.log(err))
  res.status(201).json({
    message: 'Handling POST requests to /posts/new',
    createdPost: newPost
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})