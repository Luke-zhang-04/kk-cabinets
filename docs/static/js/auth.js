let toggleSwitch

function logout() {
    firebase.auth().signOut()
    console.log("Sucessfully Logged Out")
}

firebase.auth().onAuthStateChanged(function(user) {
    toggleSwitch = document.getElementById("navbarLogin")
    if (user) {
        var user = firebase.auth().currentUser;
        window.uid = user.uid
        window.email = user.email
        window.emailVerified = user.emailVerified
        window.providerData = user.providerData

        if(user != null){
            window.useremail = user.email
        }

        toggleSwitch.innerHTML = "Logout"
        toggleSwitch.addEventListener("click", logout)
        toggleSwitch.setAttribute("href", "#")

        console.log(window.useremail, window.uid, window.providerData)
    } else {
        console.log("No user signed in")
        toggleSwitch.innerHTML = "Login/Register"
        toggleSwitch.removeEventListener("click", logout)
        toggleSwitch.setAttribute("href", "login.html")
    }
})