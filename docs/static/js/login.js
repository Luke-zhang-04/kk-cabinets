let state = "login"
let provider = new firebase.auth.GoogleAuthProvider()
let windowWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth

//auth state changed
firebase.auth().onAuthStateChanged(function(user) {
    //let user = firebase.auth().currentUser
    if (user) {
        console.log(user, user.providerData)
    } else {
        // No user is signed in.
    }
})

//sign in with google
function googleSignin() {
    let err = false
    firebase.auth().signInWithPopup(provider).then(function(result) { //sign in with popul
        let token = result.credential.accessToken
        let user = result.user
        console.log(token, user)
    }).catch(function(error) { //alert error
       let errorCode = error.code
       let errorMessage = error.message
       window.alert("ERROR! Code: " + errorCode + "\nInfo: " + errorMessage)
       err = true
    }).then(_ => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user && !err) { //if properly signed in/registered
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) { //try and get user info from database
                    if (!snapshot.exists()) { //if user doesn't exist
                        let user = firebase.auth().currentUser;
                        createNewUser(user.uid, user.email) //create a new user
                        console.log(user.uid, user.email, user)
                    }
                    window.location.href = "index.html" //redirect
                })
            } else {
                // No user is signed in.
            }
        })
    })
}

//show register forms
function showRegister() {
    state = "register"
    
    if (windowWidth >= 768) {
        document.getElementById("to_login").style.display = "block"
        document.getElementById("to_register").style.display = "none"

        document.getElementById("login").style.display = "none"
        document.getElementById("register").style.display = "block"
    } else {
        document.getElementById("to_login_mobile").style.display = "block"
        document.getElementById("to_register_mobile").style.display = "none"

        document.getElementById("login").style.display = "none"
        document.getElementById("register").style.display = "block"
    }
}

//show login forms
function showLogin() {
    state = "login"
    if (windowWidth >= 768) {
        document.getElementById("to_register").style.display = "block"
        document.getElementById("to_login").style.display = "none"

        document.getElementById("register").style.display = "none"
        document.getElementById("login").style.display = "block"
    } else {
        document.getElementById("to_register_mobile").style.display = "block"
        document.getElementById("to_login_mobile").style.display = "none"

        document.getElementById("register").style.display = "none"
        document.getElementById("login").style.display = "block"
    }
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
                //let user = firebase.auth().currentUser;
                console.log(user, user.providerData)

                user.sendEmailVerification().then(function() { //send verification email
                    window.alert("Success! An email has been sent to " + email + " Please confirm your email to access all features.")
                    showLogin()
                    window.location.href = "index.html"
                  }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message
                    window.alert("ERROR! Code: " + errorCode + "\nInfo: " + errorMessage)
                })

                createNewUser(user.uid, user.email)

            }
        })
    }
}

//create a new user
function createNewUser(userId, email) {
    firebase.database().ref('users/' + userId).set({
      uid: userId,
      email: email,
      ratings: {}
    })
}

//logout user
function logout() {
    firebase.auth().signOut();
    console.log("succesfully out")
}

//log a user in
function login(email, password) {
    let err = false
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) { //sign in with email and pswrd
        var errorCode = error.code
        var errorMessage = error.message
        window.alert("ERROR! Code: " + errorCode + "\nInfo: " + errorMessage)
        err = true
    }).then(_ => {
        if (!err) {
            window.location.href = "index.html" //redirect
        }
    })
}

function main() {
    //set buttons for regristration and login changing
    Array.from(document.getElementsByClassName("switchButton")).forEach(self => {
        self.addEventListener("click", _ => {
            if (state === "login") {
                showRegister()
            } else {
                showLogin()
            }
        })
    })

    //regristration button
    document.getElementById("register_button").addEventListener("click", _ => {
        let info = [
            document.getElementById("register_email").value,
            document.getElementById("register_password").value,
            document.getElementById("register_password_confirm").value
        ]
        register(...info)
    })

    //login button
    document.getElementById("login_button").addEventListener("click", _ => {
        let info = [
            document.getElementById("login_email").value,
            document.getElementById("login_password").value,
        ]
        login(...info)
    })

    //google login button
    document.getElementById("login_google").addEventListener("click", _ => {
        googleSignin()
    })

    document.getElementById("register_password_confirm").addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            document.getElementById("register_button").click()
        }
    })

    document.getElementById("login_password").addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            document.getElementById("login_button").click()
        }
    })

    if (windowWidth < 768) {
        document.getElementsByClassName("authChange")[0].style.display = "none"
        document.getElementById("mobileAuthChange").style.display = "block"
    }
}

main()