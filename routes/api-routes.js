// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const allDrinks = require("../dev-shared-files/all-drinks.json");
const alcoholicDrinks = require("../dev-shared-files/alcoholic-drinks.json");
const util = require("util");
const path = require("path");
var owasp = require('owasp-password-strength-test');

//==========REMOVE FOR DEPLOYMENT======================
// to bypass password strength tester, set STRONG_PASSWORD=true in .env file
require("dotenv").config();
//==========REMOVE FOR DEPLOYMENT======================


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      strong: true    // used to indicate a strong password when user is signing up
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    // Testing password strength:
    var result = owasp.test(req.body.password);
    
    // FOR DEV PURPOSES PASSWORD CAN BE SET TO ALWAYS BE STRONG
    // IMPORTANT: THESE LINES MUST BE COMMENTED OUT BEFORE DEPLOYMENT
    // =============================================
    console.log(process.env.STRONG_PASSWORD)
    if (process.env.STRONG_PASSWORD === "yes") {
      result.strong = true
    }
    // =============================================


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
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json(req.user);
  });

  app.get("/api/drinks", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      db.Drink.findAll().then((result) => {
        res.json(result);
      })
    }
  })

  //seeder route to migrate data from array data to SQL data
  app.get("/api/seeder", async (req, res) => {
    let alreadyEntered = [];
    await seed(allDrinks, alreadyEntered);
    await seed(alcoholicDrinks, alreadyEntered);
    res.json("seeded!")
  })

  app.get("api/rum", (req, res) => {
    db.Drink.findAll({where: {
      rum: {
        type: true
      }
    }}).then(function(results) {
      res.json(results)
    });
  
  })

  app.get("api/whiskey", (req, res) => {
    db.Drink.findAll({where: {
      whiskey: {
        type: true
      }
    }}).then(function(results) {
      res.json(results)
    });
  
  })

  app.get("api/tequila", (req, res) => {
    db.Drink.findAll({where: {
      tequila: {
        type: true
      }
    }}).then(function(results) {
      res.json(results)
    });
  
  })

  app.get("api/vodka", (req, res) => {
    db.Drink.findAll({where: {
      vodka: {
        type: true
      }
    }}).then(function(results) {
      res.json(results)
    });
  
  })

  app.get("api/gin", (req, res) => {
    db.Drink.findAll({where: {
      gin: {
        type: true
      }
    }}).then(function(results) {
      res.json(results)
    });
  
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
        category: element.strCategory.replace(/ /g,""),
        alcoholic: (element.strAlcoholic).toLowerCase() === "alcoholic" ? true : false,
        instructions: element.strInstructions,
        glass: element.strGlass,
        thumbnail: element.strDrinkThumb,
        video_url: element.strVideo || "",
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