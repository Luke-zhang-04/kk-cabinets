/*
	KK Cabinets
    Copyright (C) 2020  Luke Zhang, Ethan Lim
    
    https://luke-zhang-04.github.io
    https://github.com/ethanlim04

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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

        let login
        firebase.database().ref("logged-in/").once("value").then(function(snapshot) {
            login = snapshot.val()
        }).then(_ => {
            if (!login) {
                login = new Map()
            }
            login[user.uid] = Date.now()
            firebase.database().ref("logged-in").set({ //push to database
                ...login
            })
        })

    } else {
        console.log("No user signed in")
        toggleSwitch.innerHTML = "Login/Register"
        toggleSwitch.removeEventListener("click", logout)
        toggleSwitch.setAttribute("href", "login")

        document.getElementById("navbarRecommend").style.display = "none"
    }
})