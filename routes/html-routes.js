// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // must be authenticated... runs authenticate function,
  // which sees if req.user object exists - and req.user is created by passport
  // passport only runs every time you open page - cookie is stored for session
  // the cookie gets deleted after closing browser
  app.get("/recipes", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/recipes.html"));
  })
  // all routes that are not specified will simply return the home page (if logged in)
  app.get("*", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

};
