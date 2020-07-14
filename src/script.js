/**
 * KK Cabinets
 * @copyright 2020 Luke Zhang, Ethan Lim
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

window.onscroll = function() {
    /*
    if (window.innerWidth > 991) {
        scroll()
    }*/
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
/*
if (window.innerWidth <= 991) {
    navbar.classList.remove("background-default")
    navbar.classList.remove("background-trans")
    navbar.classList.add("background-white")
}*/