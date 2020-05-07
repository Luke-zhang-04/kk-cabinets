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

let storageRef = storage.ref("gallery")

//auth state changed
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        get_recommendations(user)
    } else {
        // No user is signed in.
    }
})

function get_recommendations(user) {
    let recommended = new Map()
    let rated = new Map()
    firebase.database().ref("/users/" + user.uid + "/predicted").once("value").then(function(snapshot) {
        for ([index, elem] of snapshot.val().entries()) {
            if (!Number.isInteger(elem) && elem >= 5) {
                recommended[index] = elem
            } else if (Number.isInteger && elem >= 7) {
                rated[index] = elem
            }
        }
    }).then(_ => {
        display_setup(recommended, "recon")
        display_setup(rated, "rated")
    }) .then(_ => {
        document.getElementById("loading").style.display = "none"
    })
}

function display_setup(data, config) {
    let allData = new Map()
    db.collection("gallery").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            allData[doc.id] = doc.data()
        })
    }).then(_ => {
        display_batch(data, allData, config)
    })
}

function display_batch(data, allData, row) {
    let columns = document.getElementById(row).getElementsByClassName("responsive_column")
    let columnNum = 0

    for (let key in data) {
        let imgURL = storageRef.child(allData[key]["file"]) //image url
        let column = columns[columnNum%4]
        let id = key

        imgURL.getDownloadURL().then(function(url) {
            //append image to column
            column.insertAdjacentHTML ( 
                "beforeend",
                "<div class=\"image_container\" id=" + id + "><img onclick=\"expand(" + id + ")\"src=\""+ url + "\"/></div>"
            )

            //attach information to image
            let element = document.getElementById(id) //shortcut for target element
            //variable for information
            let info = "<br/>Colour: " + allData[id]["details"]["colour"].charAt(0).toUpperCase() + allData[id]["details"]["colour"].slice(1) + "<br/>Furniture: "

            //furniture type
            if (allData[id]["details"]["furniture"]["countertop"] && allData[id]["details"]["furniture"]["cabinet"]) {
                info += "Countertop and Cabinets "
            } else if (allData[id]["details"]["furniture"]["cabinet"]) {
                info += "Cabinets"
            } else if (allData[id]["details"]["furniture"]["countertop"]) {
                info += "Countertop"
            }

            //location
            info += "<br/>Location: " + allData[id]["details"]["location"].charAt(0).toUpperCase() + allData[id]["details"]["location"].slice(1)
            //material
            info += "<br/>Material: " + allData[id]["details"]["material"].charAt(0).toUpperCase() + allData[id]["details"]["material"].slice(1)
            //pattern
            info += "<br/>Pattern: " + (allData[id]["details"]["pattern"] ? "Yes" : "None")

            if (row == "recon") {
                info += "<br/>Estimated rating: " + data[id]
            } else if (row == "rated") {
                info += "<br/>Your rating: " + data[id]
            }

            element.insertAdjacentHTML (
                "beforeend",
                "<div class=\"details\"><p>" + info + "<p>"
            )
        })
        columnNum++
    }

    if (Object.keys(data).length == 0) {
        if (row == "recon") {
            let header = document.getElementById("reconHeader")
            header.insertAdjacentHTML(
                "afterend",
                "<p class=\"noDisplay\">It looks like we couldn't get you a suitable recommendation. Please rate more items or wait as the program could still be processing your ratings.</p>"
            )
        } else if (row == "rated") {
            let header = document.getElementById("ratedHeader")
            header.insertAdjacentHTML(
                "afterend",
                "<p class=\"noDisplay\">It looks like you haven't rated anything highly yet. Please rate more items. </p>"
            )
        }
    }
}

function expand(key) {
    let element = document.getElementById(key)
    let container = element.getElementsByClassName("details")[0]
    if (container.style.maxHeight){
        container.style.maxHeight = null;
    } else {
        container.style.maxHeight = container.scrollHeight + "px";
    }
}