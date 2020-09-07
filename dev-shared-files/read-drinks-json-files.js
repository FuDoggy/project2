const util = require("util")
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);

// INSTRUCTIONS FOR USING THIS SCRIPT:
// 1. FILENAME contains the Alcoholic-drinks.json file name. Change if necessary.
// 2. Change STRING_TO_FIND to the property you'd like to find.
// For example, "strDrink" will list all drink names in alcoholic-drinks.json
// 3. Run the script with node.
const FILENAME = "./dev-shared-files/alcoholic-drinks.json"
const STRING_TO_FIND = "strIngredient1";



async function read() {
    try {
        nullCounter = 0;
        counter = 1;
        let drinkObjArray = await readFileAsync(FILENAME, "utf8")
        drinkObjArray = JSON.parse(drinkObjArray)
        for (let drink of drinkObjArray) {
            let drinkDetails = drink["drinks"][0];
            if (drinkDetails[STRING_TO_FIND] !== null) {
                console.log(`${counter}. ${drinkDetails[STRING_TO_FIND]}`)
                counter++;
            }
            else{
                nullCounter++;
            }
        }
        console.log(`There were ${nullCounter} null values found for ${STRING_TO_FIND}.`)
    }
    catch (err) {
        throw err;
    }
}

read();

// Notes on data reads:
/* There are 158 total drinks in all-drinks.json, with the most ingredients being 12.
There are 100 alcoholic drinks and 58 non-alcoholic drinks listed.
There are 36 alcoholic drinks in alcoholic-drinks.json, with the most ingredients being 6.
strAlcoholic is NOT NULL. (alcoholic or not)
strInstructions is NOT NULL. (this is the recipe)
strDrinkThumb is NOT NULL. (this is the picture)
strDrink is NOT NULL. (this is the name of the drink)
strVideo => Only 3 drinks have videos.
*/