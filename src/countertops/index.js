/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author luke zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

let data = new Map
let columnNum = 0
let columns = $("#row").find(".responsive_column")
let imgURL
let storageRef = storage.ref("countertops")

//if array conains target
function contains(target, array) {
    for (i of array) {
        if (target === i) {
            return true
        }
    }
    return false
}

//remove element from array
function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele !== value
    })
}

//get countertops from firestore
db.collection("countertops").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data()
    })
    display_batch(data)
})

//handle data and display images accordingly
function display_batch(data) {
    for (let key in data) {
        imgURL = storageRef.child(data[key]["file"]) //image url
        let column = columns[columnNum%4] //column to append image to
        let id = key //for asynchronus getDownloadURL
        imgURL.getDownloadURL().then(function(url) {
            //append image to column
            $(column).append(
                "<div class=\"image_container\" id=" + id + "><img onclick=\"expand(" + id + ")\"src=\""+ url + "\"/></div>"
            )

            //attach information to image
            let element = $("#" + id) //shortcut for target element

            //append information to element
            element.append(
                "<div class=\"details\"><p>" + data[id]["caption"] + "<p></div>"
            )
        })
        columnNum++
    }
    //remove loading gif
    $("#loading").css("display", "none")
}

//makes information drop down
function expand(key) {
    let element = document.getElementById(key)
    let container = element.getElementsByClassName("details")[0]
    if (container.style.maxHeight){
        container.style.maxHeight = null;
    } else {
        container.style.maxHeight = container.scrollHeight + "px";
    }
}
