let toggleSwitch

function logout() {
    firebase.auth().signOut()
    console.log("Sucessfully Logged Out")
}

firebase.auth().onAuthStateChanged(function(user) {
    toggleSwitch = document.getElementById("navbarLogin")
    if (user) {
        var user = firebase.auth().currentUser;
        /*
        window.uid = user.uid
        window.email = user.email
        window.emailVerified = user.emailVerified
        */
        window.user = user
        window.providerData = user.providerData

        toggleSwitch.innerHTML = "Logout"
        toggleSwitch.addEventListener("click", logout)
        toggleSwitch.setAttribute("href", "#")

        console.log(window.user, window.providerData)
    } else {
        console.log("No user signed in")
        toggleSwitch.innerHTML = "Login/Register"
        toggleSwitch.removeEventListener("click", logout)
        toggleSwitch.setAttribute("href", "login.html")
    }
})