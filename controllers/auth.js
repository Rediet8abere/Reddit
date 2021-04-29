const User = require("../models/user");
const jwt = require('jsonwebtoken');


module.exports = app => {
  // SIGN UP FORM
  app.get("/sign-up", (req, res) => {
    console.log("GET------HERE")
    res.render("sign-up");
  });

  // SIGN UP POST
  app.post("/sign-up", (req, res) => {
    // Create User and JWT
    console.log("POST-------HERE")
    const user = new User(req.body);
    

    user
      .save()
      .then(user => {
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.redirect("/");
      })
      .catch(err => {
        console.log(err.message);
        return res.status(400).send({ err: err });
      });
  });
};