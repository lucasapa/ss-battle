/* Author: Team w&w */

function hideLoginForm() {
    var element = document.getElementById("loginPage");
    element.style.display = "none";
}

function validateUsername() {
    var username = document.getElementById("username").value();
    if (username.contains("%")) {
        document.getElementById("username").value("");
    }
}





