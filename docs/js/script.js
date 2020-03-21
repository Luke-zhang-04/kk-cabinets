window.onscroll = function() {
    scroll()
}

// Get the navbar
let navbar = document.getElementById("navbar")
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
}