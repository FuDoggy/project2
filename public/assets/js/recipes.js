$("#recipe-form").on("submit", function(event) {
    event.preventDefault();
    console.log(event)
    console.log("hi")
    console.log($("#drink-name").val());

    // this grabs the value of each field, since all inputs have a class of ".recipe-inputs"
    for (let i = 0, j = $(".recipe-inputs").length; i < j; i++) {
        console.log($(".recipe-inputs").eq(i).val())
    }

    localStorage.getItem("")
    // next we have to validate the data - make sure fields are not null, etc.
    // pictures? videos?

    // next step is $.post to the database
})