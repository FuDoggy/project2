//Dependencies
var express = require("express");
var app = express();
const exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/apiRoutes");


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use("/api", apiRoutes);
require("./routes/apiRoutes")(app)

// Routes
// =============================================================


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
 
app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
  });
});
