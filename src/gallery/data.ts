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

import * as types from "./types"
import * as utils from "./utils"
import {firestore as db} from "../_firebase"

export const data = (async () => {
    const galleryData: {[key: string]: types.GalleryItem & {id: string}} = {}
    const filterOptions: types.FilterOptions = {
        colours: [],
        materials: [],
        furniture: ["cabinets", "countertop"],
        pattern: undefined,
        locations: [],
    }
    const infoTypes: types.GalleryParams[] = ["colour", "material", "location"]

    for (const doc of utils.snapshotToArray(await db?.collection("gallery").get())) {
        const docData = doc.data()

        if (types.isGalleryItem(docData)) {
            galleryData[doc.id] = {...docData, id: doc.id}

            const {details} = docData

            for (const infoType of infoTypes) {
                // Add filters
                const detail = details[infoType].replace(/ /gu, "") ? details[infoType] : "mixed"

                // If filter category not included yet, push it
                if (!filterOptions[`${infoType}s` as types.FilterKeys].includes(detail)) {
                    filterOptions[`${infoType}s` as types.FilterKeys].push(detail)
                }
            }
        }
    }

    return {galleryData, filterOptions}
})()
