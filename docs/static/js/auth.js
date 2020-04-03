let toggleSwitch

function logout() {
    firebase.auth().signOut()
    console.log("Sucessfully Logged Out")
}

firebase.auth().onAuthStateChanged(function(user) {
    toggleSwitch = document.getElementById("navbarLogin")
    if (user) {

        toggleSwitch.innerHTML = "Logout"
        toggleSwitch.addEventListener("click", logout)
        toggleSwitch.setAttribute("href", "#")

        document.getElementById("navbarRecommend").style.display = "block"

        console.log(user, user.providerData)
    } else {
        console.log("No user signed in")
        toggleSwitch.innerHTML = "Login/Register"
        toggleSwitch.removeEventListener("click", logout)
        toggleSwitch.setAttribute("href", "login")

        document.getElementById("navbarRecommend").style.display = "none"
    }
})