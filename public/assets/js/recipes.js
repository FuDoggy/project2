$("#recipe-form").on("submit", function(event) {
    event.preventDefault();
    console.log(event)
    console.log("hi")
    console.log($("#drink-name").val());

    // this grabs the value of each field, since all inputs have a class of ".recipe-inputs"
    for (let i = 0, j = $(".recipe-inputs").length; i < j; i++) {
        console.log($(".recipe-inputs").eq(i).val())
    }

    // get the user email so we can associate the user with the stored recipe in the SQL database
    let userEmail = localStorage.getItem("express-bartender-userEmail")
    let userId = localStorage.getItem("express-bartender-userId")

    // next we have to validate the data - make sure fields are not null, etc. Sequelize queries will return errors and crash server if the errors are not properly handled

    // pictures? videos? we need to decide what we are posting to the database. Probably we can't store user videos, or even pictions, it would be preferable just to have a link to them. Will there be a default picture for drinks? Will the recipes be the same table as our currently existing drink table? Will we have a separate recipe table, or will recipes just be listed under the user table?

    // Finally, the last step is $.post to the database
})