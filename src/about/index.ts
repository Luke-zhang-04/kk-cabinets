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

declare const $: typeof import("jquery")

const enum About {
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
                scrollTop: document.querySelector<HTMLElement>(hash)?.offsetTop ?? 0
            }

            $("html, body").animate(
                animateProperties,
                About.ScrollTime,
                () => {
                    window.location.hash = hash
                }
            )
        }
    })
})

export default {}
