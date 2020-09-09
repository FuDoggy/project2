$(document).ready(() => {
    let userEmail = localStorage.getItem("express-bartender-userEmail");
    let userId = localStorage.getItem("express-bartender-userId");
    let alcoCheck = document.getElementById("drink-alcoholic");

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
        // TODO next we have to validate the data - make sure fields are not null, etc. Sequelize queries will return errors and crash server if the errors are not properly handled

        // TODO pictures? videos? we need to decide what we are posting to the database. 
        // Probably we can't store user videos, or even pictions, it would be preferable just to have a link to them. 
        // Will there be a default picture for drinks? 
        // Will the recipes be the same table as our currently existing drink table? 
        // Will we have a separate recipe table, or will recipes just be listed under the user table?

        // Finally, the last step is $.post the new drink object to the database
        console.log(newDrinkObj);
        $.post("/api/drinks/new", newDrinkObj);
        
    });

    // upon clicking the view my drinks button, view the user's drinks
    $("#view-my-drinks").on("click", function() {
        console.log("clicked");
        queryUrl = "/api/drinks/user/" + userId
        $.get(queryUrl).then((data) => {
            console.log("data is")
            console.log(data);
        })
    })
});