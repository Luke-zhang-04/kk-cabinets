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

declare const $: typeof import("jquery")

enum About {
    ScrollTime = 800,
}

/**
 * Jquery smooth scroll on card click
 */
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
        const {hash} = window.location

        if (window.location.hash) {
            event.preventDefault()

            const animateProperties = {
                scrollTop:
                    document.querySelector<HTMLElement>(hash)?.offsetTop ?? 0,
            }

            $("html, body").animate(
                animateProperties,
                About.ScrollTime,
                () => {
                    window.location.hash = hash
                },
            )
        }
    })
})

export default {}
