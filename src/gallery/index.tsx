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

import "regenerator-runtime/runtime"
import "./clickListeners"
import * as Types from "./types"
import {firestore as db} from "../_firebase"
import utils from "./utils"

type GalleryParams = "colour" | "material" | "location"

type FilterKeys = `${GalleryParams}s`

declare const DeStagnate: typeof import("destagnate") // Unfourtunately, rollup has issues with circular dependencies

/**
 * Values for usage later
 */
enum Values {
    ImageUrl = "https://firebasestorage.googleapis.com/v0/b/kk-cabinets.appspot.com/o/gallery%2F",
    UrlPrefix = "?alt=media"
}

const galleryData: {[key: string]: Types.GalleryItem} = {},

    filterOptions: Types.FilterOptions = {
        colours: [],
        materials: [],
        furniture: ["cabinets", "countertop"],
        pattern: undefined,
        locations: [],
    },

    infoTypes: GalleryParams[] = ["colour", "material", "location"]

type State = {
    activeFilters: Types.ActiveFilters,
    galleryItems: Types.GalleryItem[],
}

const capitalizeFirst = (str: string): string => str[0].toUpperCase() + str.slice(1)

class Gallery extends DeStagnate.default<Record<string, unknown>, State> {

    public constructor (parent: HTMLElement) {
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

    public clearFilters = (): void => {
        this.setState({activeFilters: {
            colours: [],
            materials: [],
            cabinets: undefined,
            countertop: undefined,
            pattern: undefined,
            locations: [],
        }})

        document.querySelectorAll<HTMLElement>(".dropdown_menu .material-icons")
            .forEach((icon) => {
                icon.innerText = "done"
            })

        const patternToggle =
            document.querySelector<HTMLElement>("#pattern_toggle span")

        if (patternToggle) {
            patternToggle.innerText = "remove"
        }

        this.applyFilters()
    }

    public applyFilters = (): void => {
        type FilterTypes = ("colour" | "material" | "location")[]

        const filterTypes: FilterTypes = ["colour", "material", "location"], // Filter rtpes
            filteredData: Types.GalleryItem[] = [], // Filtered data
            {activeFilters} = this.state

        for (const item of Object.values(galleryData)) {
            let isfiltered = false

            for (const filter of filterTypes) { // Make sure the filters don't catch this item
                if (activeFilters[`${filter}s` as FilterKeys].includes(item.details[filter])) {
                    isfiltered = true

                    break
                }
            }

            if (
                isfiltered ||
                activeFilters.pattern !== undefined && item.details.pattern !== activeFilters.pattern
            ) {
                continue
            } else if (activeFilters.countertop !== undefined && activeFilters.cabinets !== undefined) {
                const didmatch = item.details.furniture.countertop !== activeFilters.countertop ||
                    item.details.furniture.cabinet !== activeFilters.cabinets

                if (didmatch) {
                    continue
                }
            }

            filteredData.push(item)
        }

        this.setState({galleryItems: filteredData})
    }

    public render = (): JSX.Element[] => {
        const data = utils.arrayToChunks(this.state.galleryItems)

        return data.map((items) => <div class="responsive_column">
            {items.map((item) => <div class="image_container">
                <img src={`${Values.ImageUrl}${item.file}${Values.UrlPrefix}`} onClick={Gallery.handleImageClick}/>
                <div class="details">
                    <p>
                        <br/>
                        {document.createTextNode(`Colour: ${capitalizeFirst(item.details.colour)}`)}
                        <br/>
                        {document.createTextNode(`Furniture: ${((): string => {
                            if (item.details.furniture.countertop && item.details.furniture.cabinet) {
                                return "Countertop and Cabinets"
                            }

                            return item.details.furniture.cabinet
                                ? "Cabinet"
                                : "Countertop"
                        })()}`)}
                        <br/>
                        {document.createTextNode(`Location: ${capitalizeFirst(item.details.location)}`)}
                        <br/>
                        {document.createTextNode(`Material: ${capitalizeFirst(item.details.material)}`)}
                        <br/>
                        {document.createTextNode(`Pattern: ${item.details.pattern ? "Yes" : "None"}`)}
                    </p>
                </div>
            </div>)}
        </div>)
    }

}

const row = document.querySelector<HTMLElement>(".responive_row#row")

if (!row) {
    throw new Error("Could not find row")
}

export const gallery = new Gallery(row)

gallery.mount()

const createFilterButtons = (): void => {
    for (const [count, infoType] of infoTypes.entries()) { // Iterate through each filter type
        for (const info of filterOptions[`${infoType}s` as FilterKeys]) { // Within these types, get all filter options
            const id = `${info}_${infoType}`, // Unique id for each button

                /* eslint-disable no-loop-func */
                onClick = (event: MouseEvent): void => { // Handle filter clicks
                    const filterName = info,
                        filterType = `${infoType}s` as FilterKeys,
                        {activeFilters} = gallery.getState

                    if (activeFilters[filterType].includes(filterName)) {
                        gallery.setState({activeFilters: {
                            ...activeFilters,
                            [filterType]: activeFilters[filterType].filter((val) => val !== filterName), // Remove an element
                        }})

                        if (event.target instanceof HTMLElement) {
                            const icon = event.target.querySelector("span")

                            if (icon) {
                                icon.innerText = "done"
                            }
                        }
                    } else {
                        gallery.setState({activeFilters: {
                            ...activeFilters,
                            [filterType]: [...activeFilters[filterType], filterName],
                        }})

                        if (event.target instanceof HTMLElement) {
                            const icon = event.target.querySelector("span")

                            if (icon) {
                                icon.innerText = "clear"
                            }
                        }
                    }

                    gallery.applyFilters()
                }

            document.querySelector(`#filter${count}`)?.appendChild( // Create button for seleting filter
                <button
                    class="dropdown_menu"
                    id={id}
                    onClick={onClick}
                >
                    {document.createTextNode(info)}
                    <span style="float: right;" class="material-icons">done</span>
                </button>,
            )
        }
    }
};

(async (): Promise<void> => {
    (await db?.collection("gallery").get())?.forEach((doc) => {
        const docData = doc.data()

        if (Types.isGalleryItem(docData)) {
            galleryData[doc.id] = docData

            const {details} = docData

            for (const infoType of infoTypes) { // Add filters
                const detail = details[infoType].replace(/ /gu, "")
                    ? details[infoType]
                    : "mixed"

                // If filter category not included yet, push it
                if (!filterOptions[`${infoType}s` as FilterKeys].includes(detail)) {
                    filterOptions[`${infoType}s` as FilterKeys].push(detail)
                }
            }
        }

        gallery.setState({galleryItems: Object.values(galleryData)})
    })

    createFilterButtons()

    const spinner = document.getElementById("loading")

    spinner?.parentNode?.removeChild(spinner)
})()
