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



// Import Post Controller 
const posts_controller = require('./controllers/posts.js');
const Post = require('./models/post');

// app.get('/', (req, res) => {
//   res.render('home');
// })

app.get('/', (req, res) => {
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


app.post('/posts/new', posts_controller.new_post)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})