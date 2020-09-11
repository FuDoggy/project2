// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

//hello kevin!
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// passport middleware only loads when user logs into session
// it runs the passport once, which provides the req.user 
// req.user is then checked whenever isAuthenticated() is run
// if we wanted an admin route, we would want a separate isAdmin() function
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// go through api routes first, since app.get("*")" is the last html route
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);



// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
