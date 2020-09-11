// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const allDrinks = require("../dev-shared-files/scripts-get-ingredients/categories.json");
const alcoholicDrinks = require("../dev-shared-files/scripts-get-ingredients/alcoholic-categories.json");
const util = require("util");
const path = require("path");
var owasp = require('owasp-password-strength-test');
const { sequelize } = require("../models");

//==========REMOVE FOR DEPLOYMENT======================
// to bypass password strength tester, set STRONG_PASSWORD=true in .env file
// require("dotenv").config();
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
    // console.log(process.env.STRONG_PASSWORD)
    // if (process.env.STRONG_PASSWORD === "yes") {
    //   result.strong = true
    // }
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
    // ================== ADD BACK IN FOR DEPLOYEMENT - login to get api data =======================
    if (!req.user) {
      res.json({});
    } else {
    // =============================================================
      db.Drink.findAll().then((result) => {
        res.json(result);
      })
      //=======================ADD BACK IN FOR DEPLOYEMENT=============
    }
    //=================================================
  })

  // ADMIN routes => =================== REMOVE before deployment===============
  // app.get("/api/admindrinks", (req,res)=> { db.Drink.findAll().then((result) => {
  //   res.json(result);
  //   })
  // })
  
  // seeder route to migrate data from array data to SQL data
  // see notes in passport.js for notes on proteting admin routes

  app.get("/api/seeder", async (req, res) => {
    let alreadyEntered = [];
    await seed(allDrinks, alreadyEntered);
    await seed(alcoholicDrinks, alreadyEntered);
    res.json("seeded!")
  })

  // route to delete database
  // see notes in passport.js for notes on proteting admin routes
  app.get("/api/admin/deleteall", async (req, res) => {
    try {
      await sequelize.query("DELETE FROM Drinks;")
      await sequelize.query("DELETE FROM Users;")
      res.json("database deleted");
    }
    catch {
      res.json("delete failed");
    }
  })

  // =========================================================================

  app.get("/api/rum", (req, res) => {
    if (!req.user) {
        res.json({});
    } else {
      db.Drink.findAll({
        where: {
          rum: true
        },
        limit: 8
      }).then(function(results) {
          res.json(results)
      });
    }
  })

  app.get("/api/whiskey", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      db.Drink.findAll({
        where: {
          whiskey: true
        },
        limit: 8
      }).then(function(results) {
        res.json(results);
      });
    }
  })

  app.get("/api/tequila", (req, res) => {
    if (!req.user) {
      res.json({});
  } else {
    db.Drink.findAll({where: {
      tequila: true
    },
    limit: 8
  }).then(function(results) {
      res.json(results)
    });
  }
  })

  app.get("/api/vodka", (req, res) => {
    if (!req.user) {
      res.json({});
  } else {
    db.Drink.findAll({where: {
      vodka: true
    },
    limit: 8
  }).then(function(results) {
      res.json(results)
    });
  }
  })

  app.get("/api/gin", (req, res) => {
    if (!req.user) {
      res.json({});
  } else {
    db.Drink.findAll({where: {
      gin: true
    },
    limit: 8
  }).then(function(results) {
      res.json(results)
    });
  }
  })

  app.get("/api/non-alcoholic", (req,res)=> {
    if (!req.user) {
      res.json({});
  } else {
    db.Drink.findAll({where: {
      alcoholic: 0
    },
  }).then(function(results){
    res.json(results)
  });
  }
  })

  app.post("/api/drinks/new", (req, res) => {
    if (!req.user) {
      res.status(200).end();
  } else {
    db.Drink.create(req.body).then((result) => {
      res.status(200).end();
    })
  }
  })

  app.get("/api/drinks/user/:userId", (req, res) => {
    if (!req.user) {
      res.json({});
  } else {
    db.Drink.findAll({
      where: {
        UserId: req.params.userId
      }
    }).then((result) => {
      res.json(result);
    })
  }
  });

  app.delete("/api/drinks/user/:drinkId", (req, res) => {
    if (!req.user) {
      res.status(200).end();
    } else {
      db.Drink.destroy({
        where: {
          id: req.params.drinkId
        }
      }).then((result) => {
        res.status(200).end();
      });
    }
  });

  app.put("/api/drinks", (req, res) => {
    if (!req.user) {
      res.status(200).end();
    } else {
      db.Drink.update(req.body, {
        where: {
          id: req.body.id
        }
      }).then((result) => {
        res.status(200).end();
      });
    }
  });
};


/** seeds the drinks table with drink data from a json file.
 * json file must contain the listed keys for each object. */
async function seed(jsonFileName, alreadyEntered) {
  try {
    // map data to a new object containing the appropriate categories for our table model
    const data = jsonFileName.map(function(a) {
      let element = a.drinks[0]
      let i = 1;
      let recipe = ""
      while(element[`strIngredient${i}`]){
        // add the measurement to the recipe
        recipe += (element[`strMeasure${i}`] || "");
        // if the measurement does not end with a space, add a space:
        if (!(/( )$/g).test(element[`strMeasure${i}`])) {
          recipe += " "
        }
        // add the ingredient after the measurement:
        recipe += element[`strIngredient${i}`] + ", ";
        i++;
      }
      // slice off the final comma
      recipe = recipe.slice(0, recipe.length - 2);
      return {
        name: element.strDrink,
        category: element.strCategory.replace(/ /g,""),
        alcoholic: (element.strAlcoholic).toLowerCase() === "alcoholic" ? true : false,
        instructions: element.strInstructions,
        glass: element.strGlass,
        thumbnail: element.strDrinkThumb,
        video_url: element.strVideo || "",
        recipe,
        rum: element.rum,
        whiskey: element.whiskey,
        gin: element.gin,
        vodka: element.vodka,
        tequila: element.tequila,
      }
    });


    for(let i = 0; i< data.length; i++){
      // add to database, but don't add duplicates
      if (!alreadyEntered.includes(data[i]["name"])) {
        // create entry in sql table, using the above mapped data
        await db.Drink.create(data[i])
        console.log(`index ${i} completed!`)
        // push entry into already entered array, to prevent duplicate
        alreadyEntered.push(data[i]["name"]);
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