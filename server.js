const express = require('express')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
app.use(cookieParser());
const exphbs  = require('express-handlebars');
const port = 3800
const key = require('dotenv').config();


const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


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
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
