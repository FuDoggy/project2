$(document).ready(() => {
    const signout = $("#signout")

    // get the logout route upon clicking the button, then load the signup page
    signout.on("click", event => {
        localStorage.removeItem("express-bartender-userEmail");
        localStorage.removeItem("express-bartender-userId");
        $.get("/logout", () => {
            window.location.replace("/")
        })
    })
})