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

export type FilterOptions = {
    colours: string[]
    materials: string[]
    furniture: ["cabinets", "countertop"]
    pattern?: boolean
    locations: string[]
}

export type ActiveFilters = {
    colours: FilterOptions["colours"]
    materials: FilterOptions["materials"]
    cabinets?: boolean
    countertop?: boolean
    pattern: FilterOptions["pattern"]
    locations: FilterOptions["locations"]
}

export type GalleryItem = {
    details: {
        colour: string
        furniture: {
            cabinet: boolean
            countertop: true
        }
        location: string
        material: string
        pattern: boolean
    }
    file: string
}

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

export type GalleryParams = "colour" | "material" | "location"

export type FilterKeys = `${GalleryParams}s`

export const isGalleryItem = (obj: {[key: string]: unknown}): obj is GalleryItem =>
    typeof obj?.file === "string" && obj.details instanceof Object

export const filterTypes = ["colour", "material", "location"] as ["colour", "material", "location"]
