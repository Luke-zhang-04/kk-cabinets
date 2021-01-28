/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author luke zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0
 */

import "regenerator-runtime/runtime"
import * as DeStagnate from "destagnate/lib/createElementOnly"
import type firebase from "firebase"
import {firestore as db} from "../_firebase"

type Testimonials = {[key: number]: string}

const isTestimonials = (
        obj: firebase.firestore.DocumentData
    ): obj is Testimonials => typeof obj === "object",

    handleScroll = (): void => {
        const elements = Array.from(
            document.getElementsByClassName("section") as HTMLCollectionOf<HTMLElement>
        )

        for (const element of elements) {
            if (
                window.pageYOffset + window.screen.height * 0.8 >= element.offsetTop &&
                !element.classList.contains("raise")
            ) {
                element.classList.add("opaque") // Make text appear
                element.classList.add("raise")
                element.classList.remove("transparent") // Remove transparent class
            } else if (
                window.pageYOffset + window.screen.height * 0.85 < element.offsetTop &&
                element.classList.contains("raise")
            ) {
                element.classList.remove("opaque") // Make text appear
                element.classList.remove("raise")
                element.classList.add("transparent") // Remove transparent class
            }
        }
    };

if (db) {
    (async (): Promise<void> => {
        const data = (await db.collection("testimonials").get()).docs[0].data(),
            container = document.getElementById("testimonial_container")

        if (isTestimonials(data) && container) {
            for (const [index, testimonial] of Object.values(data).entries()) {
                container.appendChild(<div class="container section transparent testimonial">
                    <div class={`jumbotron-${index % 2 === 0 ? "1" : "2"}`}>
                        <p>{`"${testimonial}"`}</p>
                    </div>
                </div>)
            }
        }

        handleScroll()
    })()
}

window.addEventListener("scroll", handleScroll)
