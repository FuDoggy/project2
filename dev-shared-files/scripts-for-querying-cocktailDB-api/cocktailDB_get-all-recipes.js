const axios = require("axios");
const ids = require("./cocktail-ids-all");

let cocktails = [];
const fs = require('fs');
const getCocktails = async()=> {
   for (let i = 0; i < ids.length; i++) {
    const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ids[i]}`)
    data.drinks ? cocktails.push(data) : ""
}
    fs.writeFile("drinks1.json", JSON.stringify(cocktails, null, 2), err=> console.log(err || "Success!"))
}
getCocktails()