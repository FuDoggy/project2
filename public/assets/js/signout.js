$(document).ready(() => {
    const signout = $("#signout")

    // get the logout route upon clicking the button, then load the signup page
    signout.on("click", event => {
        $.get("/logout", () => {
            window.location.replace("/")
        })
    })
})