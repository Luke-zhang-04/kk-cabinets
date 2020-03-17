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
        let jumbotron = document.createElement("div")
        if (alternating % 2 == 0) {
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
        elements[counter].classList.remove("transparent") //remove transparent class
        counter ++ //increment counter to next element
        if (positions[counter] <= window.pageYOffset+window.screen.height*0.8) {
            scroll()//if scrolled through more than one element recurse to load multiple elements at once
        }
    }
}