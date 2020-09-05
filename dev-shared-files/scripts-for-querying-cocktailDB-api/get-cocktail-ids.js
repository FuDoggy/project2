const axios = require("axios");
const util = require("util")
const fs = require("fs");
let writeFileAsync = util.promisify(fs.writeFile);


const getList = async()=> {
  const {data:{drinks:alcoholic}} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`);
  const {data:{drinks:nonalcoholic}} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
  let drinks = alcoholic.map(a=> a.idDrink).concat(nonalcoholic.map(a=> a.idDrink));
  drinks = JSON.stringify(drinks, null, 2);
  try {
    writeFileAsync("cocktail-ids-all.json", drinks)
  }
  catch (err) {
    throw err;
  }
};
getList()