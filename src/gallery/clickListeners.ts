/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author Luke Zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0-or-later
 */

// Filter Expanding
document.querySelectorAll<HTMLElement>(".expand-filter").forEach((element, index) => {
    element.addEventListener("click", () => {
        const filter = document.querySelector(`#filter${index}`)

        if (filter && filter instanceof HTMLElement) {
            if (filter.style.maxHeight) {
                filter.style.maxHeight = ""
            } else {
                filter.style.maxHeight = `${filter.scrollHeight}px`
            }
        }
    })
})

// Toggler for pattern fitler
document
    .querySelector<HTMLElement>("#pattern_toggle")
    ?.addEventListener("click", async (event) => {
        const {gallery} = await import("./index")

        if (event.target instanceof HTMLElement) {
            const icon = event.target.querySelector("span")

            if (icon?.innerText === "remove") {
                // If current setting is either or
                icon.innerText = "clear"
                gallery.setState({
                    activeFilters: {
                        ...gallery.getState.activeFilters,
                        pattern: false,
                    },
                })
            } else if (icon?.innerText === "clear") {
                // If current setting is no pattern
                icon.innerText = "done"
                gallery.setState({
                    activeFilters: {
                        ...gallery.getState.activeFilters,
                        pattern: true,
                    },
                })
            } else if (icon?.innerText === "done") {
                // If current setting is with a pattern
                icon.innerText = "remove"
                gallery.setState({
                    activeFilters: {
                        ...gallery.getState.activeFilters,
                        pattern: undefined,
                    },
                })
            }

            gallery.applyFilters()
        }
    })

// Toggler for furniture types
document.querySelectorAll<HTMLElement>(".furniture_dropdown").forEach((element) => {
    const furnitureDropdowns = ["either", "both", "countertop", "cabinets"]

    element.addEventListener("click", async (event) => {
        if (event.target instanceof HTMLElement) {
            const {gallery} = await import("./index")

            for (const dropdown of furnitureDropdowns) {
                const dropdownBtn = document.querySelector<HTMLElement>(
                    `#${dropdown}_furniture span`,
                )

                if (dropdownBtn) {
                    dropdownBtn.innerText = ""
                }
            }

            const icon = event.target.querySelector<HTMLElement>("span")
            const filterChoice = event.target.id.replace("_furniture", "")

            if (icon) {
                icon.innerHTML = "done"
            }

            let shouldShowCabinets: boolean | undefined = true
            let shouldShowCountertops: boolean | undefined = true

            switch (filterChoice) {
                case "both": // If current setting is both countertops and cabinets
                    shouldShowCabinets = true
                    shouldShowCountertops = true
                    break

                case "either": // If current setting is either countertops or cabinets
                    shouldShowCabinets = undefined
                    shouldShowCountertops = undefined
                    break

                case "countertop": // If current setting is countertops only
                    shouldShowCabinets = false
                    shouldShowCountertops = true
                    break

                case "cabinets": // If current setting is cabinets only
                    shouldShowCabinets = true
                    shouldShowCountertops = false
                    break

                default:
                    break
            }

            gallery.setState({
                activeFilters: {
                    ...gallery.getState.activeFilters,
                    cabinets: shouldShowCabinets,
                    countertop: shouldShowCountertops,
                },
            })

            gallery.applyFilters()
        }
    })
})

document
    .querySelector<HTMLElement>("#clear-filters")
    ?.addEventListener("click", async () => (await import("./index")).gallery.clearFilters())
document
    .querySelector<HTMLElement>("#apply-filters")
    ?.addEventListener("click", async () => (await import("./index")).gallery.applyFilters())
