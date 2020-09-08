const util = require("util")
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const FILENAME = "./dev-shared-files/alcoholic-drinks.json"

/** gets all ingredients from the file and stores as json */
async function getIngredients() {
    try {
        // store all ingredients in an array
        ingredientArray = []

        // get the json data as a string, then parse it
        let drinkObjArray = await readFileAsync(FILENAME, "utf8")
        drinkObjArray = JSON.parse(drinkObjArray)
        // loop through parsed json to get all ingredients and add to array
        for (let drink of drinkObjArray) {
            for (let ingredientCounter = 1; ingredientCounter <=12; ingredientCounter++) {
                let currentIngredient = "strIngredient"
                currentIngredient += ingredientCounter;
                let drinkDetails = drink["drinks"][0];
                // push all unique ingredients to array
                if (drinkDetails[currentIngredient] !== null && !ingredientArray.includes(drinkDetails[currentIngredient].toLowerCase()) && drinkDetails[currentIngredient] !== "") {
                    ingredientArray.push(drinkDetails[currentIngredient].toLowerCase())
                }
            }
        }
        // sort ingredients alphabetically
        ingredientArray.sort();
        console.log(ingredientArray);
        
        // write to a json file. Also title-case the ingredients and write to a file.
        fs.writeFile("lowercased-ingredients.json", JSON.stringify(ingredientArray, null, 2), (err) => {if (err) throw err})
    }
    catch (err) {
        throw err;
    }
}

getIngredients()