/*
	KK Cabinets
    Copyright (C) 2020  Luke Zhang, Ethan Lim
    
    https://github.com/Luke-zhang-04
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

let alternating = 0;
let testimonialContainer = document.getElementById("testimonial_container")
// Get the navbar
let navbar = document.getElementById("navbar")

let counter = 0

//get section positions
let elements //elements w/ class section
let objects
let positions

db.collection("testimonials").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        displayTestimonials(doc.data())
    })
})

function displayTestimonials(obj) {
    let list = Object.values(obj)
    for (i of list) {
        let container = document.createElement("div")
        container.classList.add("container")
        container.classList.add("section")
        container.classList.add("transparent")
        container.classList.add("testimonial")
        let jumbotron = document.createElement("div")
        if (alternating % 2 === 0) {
            jumbotron.classList.add("jumbotron-1")
        } else {
            jumbotron.classList.add("jumbotron-2")
        }
        
        let para = document.createElement("p")
        para.innerHTML = "\"" + i + "\""

        container.appendChild(jumbotron)
        jumbotron.appendChild(para)
        testimonialContainer.appendChild(container)
        alternating ++
    }
    elements = document.getElementsByClassName("section")
    objects = Array.prototype.slice.call(elements) //turn HTML collection into arryay
    positions = objects.map(i => i.offsetTop) //get positions of the elements
    scroll()
}

window.onscroll = function() {
    scroll()
}

// Add a background to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scroll() {
    if (window.pageYOffset >= 25) {
        navbar.classList.remove("background-default")
        navbar.classList.remove("background-trans")
        navbar.classList.add("background-white")
    } else {
        navbar.classList.remove("background-white")
        navbar.classList.add("background-trans")
    }

    if (window.pageYOffset+window.screen.height*0.8 >= positions[counter]) { //if bottom of screen*0.8 is below elements[counter]
        elements[counter].classList.add("opaque") //make text appear
        elements[counter].classList.add("raise")
        elements[counter].classList.remove("transparent") //remove transparent class
        counter ++ //increment counter to next element
        if (positions[counter] <= window.pageYOffset+window.screen.height*0.8) {
            scroll()//if scrolled through more than one element recurse to load multiple elements at once
        }
    }

    if (window.pageYOffset+window.screen.height*0.85 <= positions[counter]) {
        elements[counter].classList.remove("opaque") //make text appear
        elements[counter].classList.remove("raise")
        elements[counter].classList.add("transparent") //remove transparent class
        counter -- //increment counter to next element
        if (positions[counter] >= window.pageYOffset+window.screen.height*0.85) {
            scroll()//if scrolled through more than one element recurse to load multiple elements at once
        }
    }
}