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

import "./clickListeners"
import * as DeStagnate from "destagnate"
import * as Types from "./types"
import {firestore as db} from "../_firebase"
import lozad from "lozad"
import utils from "./utils"

/* eslint-disable @typescript-eslint/no-magic-numbers */

type GalleryParams = "colour" | "material" | "location"

type FilterKeys = `${GalleryParams}s`

/**
 * Values for usage later
 */
enum Values {
    ImageUrl = "https://firebasestorage.googleapis.com/v0/b/kk-cabinets.appspot.com/o/gallery%2F",
    UrlPrefix = "?alt=media",
}

const galleryData: {[key: string]: Types.GalleryItem} = {}

const filterOptions: Types.FilterOptions = {
    colours: [],
    materials: [],
    furniture: ["cabinets", "countertop"],
    pattern: undefined,
    locations: [],
}

const infoTypes: GalleryParams[] = ["colour", "material", "location"]

type State = {
    activeFilters: Types.ActiveFilters
    galleryItems: Types.GalleryItem[]
}

const capitalizeFirst = (str: string): string => str[0].toUpperCase() + str.slice(1)

class Gallery extends DeStagnate.Component<{[key: string]: unknown}, State> {
    public isfirstRender = true

    public constructor(parent: HTMLElement) {
        super(parent)

        this.state = {
            activeFilters: {
                colours: [],
                materials: [],
                cabinets: undefined,
                countertop: undefined,
                pattern: undefined,
                locations: [],
            },
            galleryItems: [],
        }
    }

    protected static handleImageClick = (event: MouseEvent): void => {
        if (event.target instanceof HTMLElement) {
            const container = event.target?.parentNode?.querySelector<HTMLElement>(".details")

            if (container?.style.maxHeight) {
                container.style.maxHeight = ""
            } else if (container) {
                container.style.maxHeight = `${container.scrollHeight}px`
            }
        }
    }

    public shouldComponentUpdate = (): boolean => this.stateDidChange(["galleryItems"], 5, 30)

    public componentDidUpdate = (): void => {
        this.isfirstRender = false

        lozad().observe()
    }

    public clearFilters = (): void => {
        this.setState({
            activeFilters: {
                colours: [],
                materials: [],
                cabinets: undefined,
                countertop: undefined,
                pattern: undefined,
                locations: [],
            },
        })

        document
            .querySelectorAll<HTMLElement>(".dropdown_menu .material-icons")
            .forEach((icon) => {
                icon.innerText = "done"
            })

        const patternToggle = document.querySelector<HTMLElement>("#pattern_toggle span")

        if (patternToggle) {
            patternToggle.innerText = "remove"
        }

        this.applyFilters()
    }

    public applyFilters = (): void => {
        type FilterTypes = ("colour" | "material" | "location")[]

        const filterTypes: FilterTypes = ["colour", "material", "location"] // Filter rtpes
        const filteredData: Types.GalleryItem[] = [] // Filtered data
        const {activeFilters} = this.state

        for (const item of Object.values(galleryData)) {
            let isFiltered = false

            for (const filter of filterTypes) {
                // Make sure the filters don't catch this item
                if (activeFilters[`${filter}s` as FilterKeys].includes(item.details[filter])) {
                    isFiltered = true

                    break
                }
            }

            if (
                isFiltered ||
                (activeFilters.pattern !== undefined &&
                    item.details.pattern !== activeFilters.pattern)
            ) {
                continue
            } else if (
                activeFilters.countertop !== undefined &&
                activeFilters.cabinets !== undefined
            ) {
                const didMatch =
                    item.details.furniture.countertop !== activeFilters.countertop ||
                    item.details.furniture.cabinet !== activeFilters.cabinets

                if (didMatch) {
                    continue
                }
            }

            filteredData.push(item)
        }

        this.setState({galleryItems: filteredData})
    }

    public render = (): JSX.Element[] => {
        let data = utils.arrayToChunks(this.state.galleryItems, 4)

        if (this.isfirstRender) {
            // Enable lazy loading
            data = data.map((items) => items.slice(0, 6))
        }

        return data.map((items) => (
            <div class="responsive_column">
                {items.map((item) => (
                    <div class="image_container">
                        <img
                            class="lozad"
                            data-src={`${Values.ImageUrl}${item.file}${Values.UrlPrefix}`}
                            onClick={Gallery.handleImageClick}
                        />
                        <div class="details">
                            <p>
                                <br />
                                {`Colour: ${capitalizeFirst(item.details.colour)}`}
                                <br />
                                {`Furniture: ${((): string => {
                                    if (
                                        item.details.furniture.countertop &&
                                        item.details.furniture.cabinet
                                    ) {
                                        return "Countertop and Cabinets"
                                    }

                                    return item.details.furniture.cabinet
                                        ? "Cabinet"
                                        : "Countertop"
                                })()}`}
                                <br />
                                {`Location: ${capitalizeFirst(item.details.location)}`}
                                <br />
                                {`Material: ${capitalizeFirst(item.details.material)}`}
                                <br />
                                {`Pattern: ${item.details.pattern ? "Yes" : "None"}`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        ))
    }
}

const row = document.querySelector<HTMLElement>(".responive_row#row")

if (!row) {
    throw new Error("Could not find row")
}

export const gallery = new Gallery(row)

gallery.mount()

const createFilterButtons = (): void => {
    for (const [count, infoType] of infoTypes.entries()) {
        // Iterate through each filter type
        for (const info of filterOptions[`${infoType}s` as FilterKeys]) {
            // Within these types, get all filter options
            const id = `${info}_${infoType}` // Unique id for each button

            /* eslint-disable no-loop-func */
            const onClick = (event: MouseEvent): void => {
                // Handle filter clicks
                const filterName = info
                const filterType = `${infoType}s` as FilterKeys
                const {activeFilters} = gallery.getState

                if (activeFilters[filterType].includes(filterName)) {
                    gallery.setState({
                        activeFilters: {
                            ...activeFilters,
                            [filterType]: activeFilters[filterType].filter(
                                (val) => val !== filterName,
                            ), // Remove an element
                        },
                    })

                    if (event.target instanceof HTMLElement) {
                        const icon = event.target.querySelector("span")

                        if (icon) {
                            icon.innerText = "done"
                        }
                    }
                } else {
                    gallery.setState({
                        activeFilters: {
                            ...activeFilters,
                            [filterType]: [...activeFilters[filterType], filterName],
                        },
                    })

                    if (event.target instanceof HTMLElement) {
                        const icon = event.target.querySelector("span")

                        if (icon) {
                            icon.innerText = "clear"
                        }
                    }
                }

                gallery.applyFilters()
            }

            document.querySelector(`#filter${count}`)?.appendChild(
                // Create button for seleting filter
                <button class="dropdown_menu" id={id} onClick={onClick}>
                    {info}
                    <span style="float: right;" class="material-icons">
                        done
                    </span>
                </button>,
            )
        }
    }
}

;(async (): Promise<void> => {
    ;(await db?.collection("gallery").get())?.forEach((doc): void => {
        const docData = doc.data()

        if (Types.isGalleryItem(docData)) {
            galleryData[doc.id] = docData

            const {details} = docData

            for (const infoType of infoTypes) {
                // Add filters
                const detail = details[infoType].replace(/ /gu, "") ? details[infoType] : "mixed"

                // If filter category not included yet, push it
                if (!filterOptions[`${infoType}s` as FilterKeys].includes(detail)) {
                    filterOptions[`${infoType}s` as FilterKeys].push(detail)
                }
            }
        }
    })

    gallery.setState({galleryItems: Object.values(galleryData)})

    createFilterButtons()

    const spinner = document.getElementById("loading")

    spinner?.parentNode?.removeChild(spinner)
})()

const handleScroll = (): void => {
    const _row = document.querySelector<HTMLElement>(".responive_row")

    if (_row) {
        const scrolledAt = window.scrollY + window.innerHeight
        const target = _row.scrollHeight + _row.offsetTop

        if (scrolledAt >= target) {
            gallery.forceUpdate()

            if (!gallery.isfirstRender) {
                document.removeEventListener("scroll", handleScroll)
            }
        }
    }
}

document.addEventListener("scroll", handleScroll)
