$(document).ready(() => {
    $("#recipe-form").on("submit", function(event) {
        event.preventDefault();
        let alcoCheck = document.getElementById("drink-alcoholic");
        let userEmail = localStorage.getItem("express-bartender-userEmail");
        let userId = localStorage.getItem("express-bartender-userId");
        // this grabs the value of each field, since all inputs have a class of ".recipe-inputs"
        
        console.log(userId)
        if (userId === null) {
            alert("Error! Log in to post recipes.");
            return;
        }
        else {
            userId = Number(userId);
        }

        let newDrinkObj = {};
        for (let i = 0, j = $(".recipe-inputs").length; i < j; i++) {
            // get the value and id of each form input
            let formInput = $(".recipe-inputs").eq(i).val();
            let elementId = ($(".recipe-inputs").eq(i).attr("id"));

            // slice off the "drink-" portion of the id string
            let databaseId = elementId.slice(6,);

            // if the checkbox is checked, set the alcoholic value to true (this value would otherwise be "on")
            if (databaseId === "alcoholic") { 
                formInput = alcoCheck.checked;
            }
            // add the data to the newDrinkObj
            newDrinkObj[databaseId] = formInput;
        }
        
        // get the user email so we can associate the user with the stored recipe in the SQL database
        
        // Associate the user ID with the drink object
        newDrinkObj["UserId"] = userId;
        // TODO next we have to validate the data - make sure fields are not null, etc. Sequelize queries will return errors and crash server if the errors are not properly handled
        
        // TODO pictures? videos? we need to decide what we are posting to the database. Probably we can't store user videos, or even pictions, it would be preferable just to have a link to them. Will there be a default picture for drinks? Will the recipes be the same table as our currently existing drink table? Will we have a separate recipe table, or will recipes just be listed under the user table?
        
        // TODO add categories, or dropdown, or checkbox for vodka, whiskey etc. 
        
        // Finally, the last step is $.post the new drink object to the database
        console.log(newDrinkObj);
        $.post("/api/drinks/new", newDrinkObj);
    });
});