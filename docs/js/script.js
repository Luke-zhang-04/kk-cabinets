window.onscroll = function() {
    scroll()
}

// Get the navbar
let navbar = document.getElementById("navbar")

let counter = 0

//get section positions
let elements = document.getElementsByClassName("section") //elements w/ class section
let objects = Array.prototype.slice.call(elements) //turn HTML collection into arryay
let positions = objects.map(i => i.offsetTop) //get positions of the elements

// Add a background to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scroll() {
    if (window.pageYOffset >= 100) {
        navbar.classList.remove("background-default")
        navbar.classList.remove("background-trans")
        navbar.classList.add("background-white")
    } else {
        navbar.classList.remove("background-white")
        navbar.classList.add("background-trans")
    }

    if (window.pageYOffset+window.screen.height*0.8 >= positions[counter]) { //if bottom of screen*0.8 is below elements[counter]
        elements[counter].classList.add("opaque") //make text appear
        elements[counter].classList.remove("transparent") //remove transparent class
        counter ++ //increment counter to next element
        if (positions[counter] <= window.pageYOffset+window.screen.height*0.8) {
            scroll()//if scrolled through more than one element recurse to load multiple elements at once
        }
    }
}