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

import * as DeStagnate from "destagnate/lib/createElementOnly"
import {firestore as db, storage} from "../_firebase"

type Countertop = {
    caption: string,
    file: string,
}

const isCountertop = (obj: {[key: string]: unknown}): obj is Countertop => (
    typeof obj.caption === "string" &&
        typeof obj.file === "string"
)

const columns = document.querySelectorAll("#row .responsive_column")

const expand = (key: number | string): void => {
    const element = document.getElementById(key.toString())
    const [container] = element?.querySelectorAll<HTMLElement>(".details") ?? []

    if (container.style.maxHeight) {
        container.style.maxHeight = ""
    } else {
        container.style.maxHeight = `${container.scrollHeight}px`
    }
}

const displayCountertops = async (): Promise<void> => {
    if (db && storage) {
        const storageRef = storage.ref("countertops")

        const data = await db.collection("countertops").get()
            .then((snapshot): {[key: string]: Countertop} => {
                const _data: {[key: string]: Countertop} = {}

                snapshot.docs.forEach((doc) => {
                    const docData = doc.data()

                    if (isCountertop(docData)) {
                        _data[doc.id] = docData
                    }
                })

                return _data
            })

        const spinner = document.getElementById("loading")

        spinner?.parentNode?.removeChild(spinner)

        for (const [index, countertop] of Object.values(data).entries()) {
            // eslint-disable-next-line
                const imageUrl = await storageRef.child(countertop.file).getDownloadURL() as string

            if (typeof imageUrl === "string") {
                const column = columns[index % 4]

                column.append(
                    <div class="image_container" id={index.toString()}>
                        <img
                            src={imageUrl}
                            onClick={(): void => expand(index)}
                        />
                        <div class="details"><p>{countertop.caption}</p></div>
                    </div>,
                )
            }
        }
    }
}

displayCountertops()
