$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  console.log("reloaded")

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
    .then((result) => {

      // if password strength is insufficient, print errors on page
      if (!result.strong) {
        $("#alert .msg").text("");
        for (let pwRequirement of result["errors"]) {
          $("#alert .msg").append("<p>" + pwRequirement + "</p>");
        }
        $("#alert").fadeIn(500);
      }
      // if password strength is sufficient, result.strong will return true
      else {
        emailInput.val("");
        passwordInput.val("");
        // Store email in local storage upon login.
        localStorage.setItem("express-bartender-userEmail", result.email)
        localStorage.setItem("express-bartender-userId", result.id)
        window.location.replace("/members");
      }
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    if (err.responseJSON.errors[0].message === "Validation isEmail on email failed") {
      var errorMessage = "A valid email address must be entered!"
      $("#alert .msg").text(errorMessage);
    }
    else if (err.responseJSON.errors[0].message === "users.email must be unique") {
      $("#alert .msg").text("That email is already in use!");
    }
    else {
      $("#alert .msg").text(err.responseJSON.errors[0].message);
    }

    $("#alert").fadeIn(500);
  }
});
