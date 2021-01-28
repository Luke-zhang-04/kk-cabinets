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
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
import {
    Controller as ScrollMagicController,
    Scene as ScrollMagicScene,
} from "scrollmagic"
import type firebase from "firebase"
import {firestore as db} from "../_firebase"

declare const {TimelineMax}: typeof import("gsap")
// declare const ScrollMagic: typeof import("scrollmagic")

const timelines = [],
    scenes = [],
    controller = new ScrollMagicController()


type Testimonials = {[key: number]: string}

type TimelineArgs = [
    targets: gsap.TweenTarget,
    vars: gsap.TweenVars,
    position?: string | number | undefined,
]

const isTestimonials = (
    obj: firebase.firestore.DocumentData
): obj is Testimonials => typeof obj === "object"

db?.collection("testimonials").get().then(async (snapshot): Promise<void> => {
    const data = snapshot.docs[0].data()

    if (isTestimonials(data)) {
        const testimonials = Object.values(data),
            container = document.getElementById("testimonial")

        if (container) {
            container.innerText = testimonials[Math.floor(Math.random() * testimonials.length)]
        }
    }
})

if (window.innerWidth >= 767) {
    let multiplyer = 1

    document.querySelectorAll(".content").forEach((element, index) => {
        multiplyer = index % 2 === 0 ? 1 : -1

        const timeline = new TimelineMax()

        timelines.push(timeline)

        const timelineElements: TimelineArgs[] = [
            [
                element.querySelector("h5 article"),
                {
                    x: 200 * multiplyer,
                    opacity: 0,
                    duration: 0.5,
                }
            ],
            [
                element.querySelector("h5 span"),
                {
                    width: 0,
                    duration: 1,
                },
                "=-0.5",
            ],
            [
                element.querySelector("h5 p"),
                {
                    x: 200 * multiplyer,
                    opacity: 0,
                    duration: 1,
                },
                "=-0.75",
            ],
            [
                element.querySelector("h5 .btn"),
                {
                    x: 200 * multiplyer,
                    opacity: 0,
                    duration: 1,
                },
                "=-0.25",
            ],
            [
                element.querySelector(".ci1"),
                {
                    x: -200 * multiplyer,
                    opacity: 0,
                    ease: Power4.easeInOut,
                    duration: 1,
                },
                "=-1",
            ],
            [
                element.querySelector(".ci2"),
                {
                    x: 200 * multiplyer,
                    opacity: 0,
                    ease: Power4.easeInOut,
                    duration: 1,
                },
                "=-0.1",
            ]
        ]

        for (const config of timelineElements) {
            if (config[0] !== null) {
                timeline.from(...config)
            }
        }

        const scene = new ScrollMagicScene({
            triggerElement: element,
            triggerHook:"onLeave",
            duration: "250%",
        })
            .setPin(element)
            // @ts-expect-error - setTween isn't defined in typedefs
            .setTween(timeline)
            .addTo(controller)

        scenes.push(scene)
    })
}
