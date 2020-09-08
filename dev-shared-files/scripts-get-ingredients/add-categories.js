const util = require("util")
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const FILENAME = "../all-drinks.json"
const FILENAME2 = "../Alcoholic-drinks.json"
/** gets all ingredients from the file and stores as json */
async function getIngredients() {
    try {
        // store all ingredients in an array
        ingredientArray = []

        // get the json data as a string, then parse it
        let drinkObjArray = await readFileAsync(FILENAME2, "utf8")
        drinkObjArray = JSON.parse(drinkObjArray)
        // loop through parsed json to get all ingredients and add to array
        for (let drink of drinkObjArray) {
            for (let ingredientCounter = 1; ingredientCounter <= 12; ingredientCounter++) {
                let currentIngredient = "strIngredient"
                currentIngredient += ingredientCounter;
                let drinkDetails = drink["drinks"][0];
                // push all unique ingredients to array
                if (drinkDetails[currentIngredient] !== null && drinkDetails[currentIngredient] !== "") {
                    if ((/rum/i).test(drinkDetails[currentIngredient])) {
                        drinkDetails["rum"] = true;
                        // if this is true, then ingredient contains the word "rum" ignoring case"
                    }

                    else {
                        if (drinkDetails["rum"] !== true) {
                            drinkDetails["rum"] = false
                        }
                    };
                    if (((/whiskey/i).test(drinkDetails[currentIngredient])) || ((/scotch/i).test(drinkDetails[currentIngredient])) || ((/bourbon/i).test(drinkDetails[currentIngredient])) || ((/jim beam/i).test(drinkDetails[currentIngredient])) || ((/jack daniels/i).test(drinkDetails[currentIngredient]))) {
                        drinkDetails["whiskey"] = true;

                    }

                    else {
                        if (drinkDetails["whiskey"] !== true) {
                            drinkDetails["whiskey"] = false
                        };
                        }
                        if ((/vodka/i).test(drinkDetails[currentIngredient])) {
                            drinkDetails["vodka"] = true;
                            
                        }
    
                        else {
                            if (drinkDetails["vodka"] !== true) {
                                drinkDetails["vodka"] = false
                            }
                        };    
                        if ((/gin/i).test(drinkDetails[currentIngredient]) && !(/ginger/i).test(drinkDetails[currentIngredient])) {
                            drinkDetails["gin"] = true;
                        }
    
                        else {
                            if (drinkDetails["gin"] !== true) {
                                drinkDetails["gin"] = false
                            }
                        }; 
                        if ((/tequila/i).test(drinkDetails[currentIngredient])) {
                            drinkDetails["tequila"] = true;
                            
                        }
    
                        else {
                            if (drinkDetails["tequila"] !== true) {
                                drinkDetails["tequila"] = false
                            }
                        };       
                }
            }
        }



        // write to a json file. Also title-case the ingredients and write to a file.
        fs.writeFile("alcoholic-categories.json", JSON.stringify(drinkObjArray, null, 2), (err) => { if (err) throw err })
    }
    catch (err) {
        throw err;
    }
}

getIngredients()