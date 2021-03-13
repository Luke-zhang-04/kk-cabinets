/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author luke zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0-or-later
 */

export default {}

// Get the navbar
const navbar = document.getElementById("navbar")

/**
 * Add a background to the navbar when you reach its scroll position.
 * Remove "sticky" when you leave the scroll position
 */
const scroll = (): void => {
    if (window.pageYOffset >= 100) {
        navbar?.classList.remove("background-default")
        navbar?.classList.remove("background-trans")
        navbar?.classList.add("background-white")
    } else {
        navbar?.classList.remove("background-white")
        navbar?.classList.add("background-trans")
    }
}

window.addEventListener("scroll", scroll)
