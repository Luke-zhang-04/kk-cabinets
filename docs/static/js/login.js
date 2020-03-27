let state = "login"

function showRegister() {
    state = "register"
    document.getElementById("to_login").style.display = "none"
    document.getElementById("to_register").style.display = "block"

    document.getElementById("login").style.display = "none"
    document.getElementById("register").style.display = "block"
}

function showLogin() {
    state = "login"
    document.getElementById("to_register").style.display = "none"
    document.getElementById("to_login").style.display = "block"

    document.getElementById("register").style.display = "none"
    document.getElementById("login").style.display = "block"
}

Array.from(document.getElementsByClassName("switchButton")).forEach(self => {
    self.addEventListener("click", function() {
        if (state === "login") {
            showRegister()
        } else {
            showLogin()
        }
    })
})