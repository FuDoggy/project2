$(document).ready(() => {
    const signout = $("#signout")

    console.log("ready")
    signout.on("click", event => {
        console.log("hey")
        $.get("/logout")
    })
})