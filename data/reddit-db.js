/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const mongoDB = 'mongodb+srv://RedditNode:' + process.env.MONGO_ATLAS_PW  + '@redditvtwo.axfzm.mongodb.net/RedditVTwo?retryWrites=true&w=majority'
// 'mongodb+srv://RedditNode:' + process.env.MONGO_ATLAS_PW + '@redditnode.axfzm.mongodb.net/RedditVTwo?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
  },
  function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to database");

    // db.close(); turn on for testing
  }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;