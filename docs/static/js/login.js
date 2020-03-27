let state = "login"

//show register forms
function showRegister() {
    state = "register"
    document.getElementById("to_login").style.display = "blick"
    document.getElementById("to_register").style.display = "none"

    document.getElementById("login").style.display = "none"
    document.getElementById("register").style.display = "block"
}

//show login forms
function showLogin() {
    state = "login"
    document.getElementById("to_register").style.display = "block"
    document.getElementById("to_login").style.display = "none"

    document.getElementById("register").style.display = "none"
    document.getElementById("login").style.display = "block"
}

//register new users
function register(email, password, password2) {
    let err = false

    if (password === password2) { //if passwords match
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) { //create new user
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            window.alert("ERROR! Code: " + errorCode + "\nInfo: " + errorMessage)
            showRegister()
            err = true
        })
    } else {
        window.alert("ERROR! Passwords do not match.")
        err = true
    }

    if (!err) { //if no errors
        firebase.auth().onAuthStateChanged((user) => {
            if (user) { //if success, send verification email
                window.useruid = user.uid

                user.sendEmailVerification().then(function() { //send verification email
                    window.alert("Success! An email has been sent to " + email + " Please confirm your email to access all features.")
                    showLogin()
                  }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message
                    window.alert("ERROR! Code: " + errorCode + "\nInfo: " + errorMessage)
                })
            }
        })
    }
}

Array.from(document.getElementsByClassName("switchButton")).forEach(self => {
    self.addEventListener("click", _ => {
        if (state === "login") {
            showRegister()
        } else {
            showLogin()
        }
    })
})

document.getElementById("register_button").addEventListener("click", _ => {
    let info = [
        document.getElementById("register_email").value,
        document.getElementById("register_password").value,
        document.getElementById("register_password_confirm").value
    ]
    register(...info)
})