// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const allDrinks = require("../dev-shared-files/all-drinks.json");
const alcoholicDrinks = require("../dev-shared-files/alcoholic-drinks.json");
const util = require("util");
const path = require("path");
var owasp = require('owasp-password-strength-test');


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    console.log(req.user)
    res.json({
      email: req.user.email,
      id: req.user.id,
      strong: true
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    // Testing password strength:
    var result = owasp.test(req.body.password);
    console.log(result)

    // if password strength is sufficient, create user:
    if (result.strong) {
      db.User.create({
        email: req.body.email,
        password: req.body.password
      }).then(() => {
          res.redirect(307, "/api/login");
      }).catch(err => {
          console.log(err)
          res.status(401).json(err);
      });
    }
    else {
      res.json(result);
    }
  });


  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout()
    res.status(200).end()
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/drinks", (req, res) => {
    // if (!req.user) {
    //   res.json({});
    // } else {
      // db.Drinks.findAll({}).then((result) => {
      //   res.json(result);
      // })
    // }
    res.json(allDrinks)
  })

  //seeder route to migrate data from array data to SQL data
  app.get("/api/seeder", async (req, res) => {
    let alreadyEntered = [];
    await seed(allDrinks, alreadyEntered);
    await seed(alcoholicDrinks, alreadyEntered);
    res.json("seeded!")
  })
  
  app.post("api/drinks", (req, res) => {
    db.Drink.create(req.body).then((result) => {
      res.status(200).end();
    })
  })
};


/** seeds the drinks table with drink data from a json file.
 * json file must contain the listed keys for each object. */
async function seed(jsonFileName, alreadyEntered) {
  try {
    const data = jsonFileName.map(function(a) {
      let element = a.drinks[0]
      let i = 1;
      let recipe = ""
      while(element[`strIngredient${i}`]){
        recipe += (element[`strMeasure${i}`] || "") + element[`strIngredient${i}`]+" "
        i++;
      }
      return {
        name: element.strDrink,
        category: element.strCategory,
        alcoholic: (element.strAlcoholic).toLowerCase() === "alcoholic" ? true : false,
        instructions: element.strInstructions,
        glass: element.strGlass,
        thumbnail: element.strDrinkThumb,
        recipe,
      }
    });


    for(let i = 0; i< data.length; i++){
      // add to database, but don't add duplicates
      // console.log(data[i])
      // console.log(data[i]["name"])
      if (!alreadyEntered.includes(data[i]["name"])) {
        await db.Drink.create(data[i])
        console.log(`index ${i} completed!`)
        alreadyEntered.push(data[i]["name"]);
        // console.log(alreadyEntered)
      }
      else {
        console.log(`$Index ${i} ${data[i]["name"]} is already in the database!`)
      }
    }
  }
  catch (err) {
    throw err;
  }

}