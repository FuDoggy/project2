$(document).ready(() => {
    let userEmail = localStorage.getItem("express-bartender-userEmail");
    let userId = localStorage.getItem("express-bartender-userId");
    let alcoCheck = document.getElementById("drink-alcoholic");
    let recipeForm = $("#recipe-form");
    let drinkToggleBtn = $("#view-my-drinks");
    let currentRecipeUpdateBtn = $("#update-current-recipe");

    // upon page load, if alcoholic checkbox is already checked, display the other checkboxes:
    alcoCheck.checked ? $("#drink-type-checkboxes").css("display", "block") : null;

    // toggle checkbox visibility when checking the "alcoholic" checkbox
    alcoCheck.addEventListener("click", function() {
        $("#drink-type-checkboxes").slideToggle("slow")
    });

    // adds an event listener that creates a user recipe upon submittal
    $("#recipe-form").on("submit", function(event) {
        event.preventDefault();
        // this grabs the value of each field, since all inputs have a class of ".recipe-inputs"
        
        // Make sure that the user id exists.
        console.log(userId)
        if (userId === null) {
            alert("Error! Log in to post recipes.");
            return;
        }
        else {
            userId = Number(userId);
        }

        let newDrinkObj = createDrinkObj();

        $.post("/api/drinks/new", newDrinkObj).then(() => {
            $(".save-indicator").slideToggle("slow", function() {
                setTimeout(() => {
                    $(".save-indicator").slideToggle("slow");
                },
                1000
                );
            });
        })
        
    });

    // upon clicking the view my drinks button, view the user's drinks
    drinkToggleBtn.on("click", function() {

        // if the recipe form is still showing, hide it
        if (document.getElementById("recipe-form").style.display !== "none") {
            recipeForm.slideToggle("slow")

            // hide the update current recipe button
            currentRecipeUpdateBtn.attr("style", "display:none");

            // change the button text
            drinkToggleBtn.text("Post a new recipe");

            // then get the recipes from the database
            console.log("clicked");
            queryUrl = "/api/drinks/user/" + userId
            $.get(queryUrl)
            .then((data) => {
                console.log("data is")
                console.log(data);
                $("#user-recipe-section").html("");

                // for each recipe:
                for (let i in data) {
                    // first append a new row
                    let drinkListItem = document.getElementById("user-recipe-section");
                    let newRow = document.createElement("div");
                    newRow.setAttribute("class", "row");
                    newRow.setAttribute("id", `recipe-${data[i].id}`);
                    drinkListItem.appendChild(newRow);

                    // then append a paragraph to that row
                    let newList = document.createElement("ul");
                    newList.setAttribute("class", `col-md-12 user-drink`);
                    newRow.appendChild(newList);
                    
                    // then set the contents of the paragraph to be a list
                    newList.innerHTML = `
                        <button type=button class='delete-button float-right btn btn-warning' id='del-btn-${data[i].id}'>Delete this recipe</button>
                        <button type=button class='update-button float-right btn btn-info' id='update-btn-${data[i].id}'>Update this recipe</button>
                        <li>The name of this drink is: ${data[i].name}</li>
                        <li>The instructions for making this drink are: ${data[i].instructions}</li>
                        <li>The glass for this drink is: ${data[i].glass}</li>
                    `;
                    addDeleteFunctionality(data[i].id, data[i].name)
                    addUpdateFunctionality(data[i])
                }
            })
            .then(() => {
                $("#user-recipe-section").slideToggle("slow");
            });
        }
        // if already showing the user recipes, switch back to the recipe entry form:
        else {
            drinkToggleBtn.text("View all my recipes posted");
            recipeForm.slideToggle("slow");
            $("#user-recipe-section").slideToggle("slow");
        }
    })

    function addDeleteFunctionality(delBtnId, name) {
        $(`#del-btn-${delBtnId}`).on("click", () => {
            let deleteConfirm = confirm(`Are you sure you would like to delete the recipe for ${name}?`)
            if (deleteConfirm) {
                let queryUrl = "/api/drinks/user/" + delBtnId
                let recipeToRemove = document.getElementById(`recipe-${delBtnId}`);
                document.getElementById("user-recipe-section").removeChild(recipeToRemove);
                $.ajax({
                    url: queryUrl,
                    method: "delete"
                })
            }
        });
    }

    /** Adds an event listener to a button to update a recipe. the data parameter includes id, name, recipe, etc. */
    function addUpdateFunctionality(data) {
        $(`#update-btn-${data.id}`).on("click", () => {
            // switch back to the recipe form
            recipeForm.slideToggle("slow")
            $("#user-recipe-section").slideToggle("slow");
            // add in an update this recipe button as well as keep the add new recipe button
            currentRecipeUpdateBtn.attr("style", "display:inline-block");
            currentRecipeUpdateBtn.text(`Update the recipe for ${data.name}`);
            drinkToggleBtn.text("View all my recipes posted");
            console.log(data)

            // Put in the values to update into the recipe form
            console.log(data.name)
            $("#drink-name").val(data.name);
            $("#drink-recipe").val(data.recipe);
            $("#drink-instructions").val(data.instructions);
            $("#drink-glass").val(data.glass);
            let drinkType = ["alcoholic", "rum", "whiskey", "tequila", "vodka", "gin"];
            for (let elem of drinkType) {
                document.getElementById(`drink-${elem}`).checked = data[elem];
            }

            // add update request to update the database
            currentRecipeUpdateBtn.on("click", function() {
                let newDrinkObj = createDrinkObj();
                console.log("NOWNOW")
    
                console.log(newDrinkObj)
                newDrinkObj["id"] = data.id;
                let queryUrl = `/api/drinks`
                $.ajax({
                    url: queryUrl,
                    method: "PUT",
                    data: newDrinkObj
                })
            })
        })
    }

    function createDrinkObj() {
        // Creating a drink object to add to the SQL database:
        let newDrinkObj = {};
        for (let i = 0, j = $(".recipe-inputs").length; i < j; i++) {
            // get the value and id of each form input
            let formInput = $(".recipe-inputs").eq(i).val();
            let elementId = ($(".recipe-inputs").eq(i).attr("id"));

            // slice off the "drink-" portion of the id string
            let databaseId = elementId.slice(6,);

            // if the "alcoholic" checkbox is checked, set the alcoholic value to true (this value would otherwise be "on")
            // only allow the rum, whiskey etc checkboxes to be true if "alcoholic" is also true
            switch (databaseId) {
                case "alcoholic":
                    formInput = alcoCheck.checked;
                    break;
                case "rum":
                    alcoCheck.checked === true ? formInput = document.getElementById("drink-rum").checked : formInput = false;
                    break;
                case "whiskey":
                    alcoCheck.checked === true ? formInput = document.getElementById("drink-whiskey").checked : formInput = false;
                    break;
                case "tequila":
                    alcoCheck.checked === true ? formInput = document.getElementById("drink-tequila").checked : formInput = false;
                    break;
                case "vodka":
                    alcoCheck.checked === true ? formInput = document.getElementById("drink-vodka").checked : formInput = false;
                    break;
                case "gin":
                    alcoCheck.checked === true ? formInput = document.getElementById("drink-gin").checked : formInput = false;
                    break;
                default:
                    break;
            }

            // add the data to the newDrinkObj
            newDrinkObj[databaseId] = formInput;
        }

        // Associate the user ID with the drink object
        newDrinkObj["UserId"] = userId;
        // hardcode a placeholder image
        newDrinkObj["thumbnail"] = "https://www.standard.co.uk/s3fs-public/thumbnails/image/2016/09/30/10/cocktails.jpg"
        // TODO next we have to validate the data - make sure fields are not null, etc. Sequelize queries will return errors and crash server if the errors are not properly handled

        // TODO pictures? videos? we need to decide what we are posting to the database. 
        // Probably we can't store user videos, or even pictions, it would be preferable just to have a link to them. 
        // Will there be a default picture for drinks? 
        // Will the recipes be the same table as our currently existing drink table? 
        // Will we have a separate recipe table, or will recipes just be listed under the user table?

        // Finally, the last step is $.post the new drink object to the database
        return newDrinkObj;
    }
});

// set picture url