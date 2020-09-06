$(document).ready(() => {
    const signout = $("#signout")

    signout.on("click", event => {
        $.get("/logout", () => {
            window.location.replace("/")
        })
    })
})