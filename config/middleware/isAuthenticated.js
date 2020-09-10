//==========REMOVE FOR DEPLOYMENT======================
// to bypass authentication, set BYPASS_AUTHENTICATION=true in .env file
// require("dotenv").config();
//==========REMOVE FOR DEPLOYMENT======================

// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route

//==========REMOVE FOR DEPLOYMENT======================
// if (process.env.BYPASS_AUTHENTICATION === 'yes') {
//    return next();
// }
//==========REMOVE FOR DEPLOYMENT======================


  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};
