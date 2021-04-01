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

// PLEASE NOTE: I am not the one who decided client side validation was a good idea

import {functions} from "../_firebase"

const loader = document.getElementById("loader")
const loading = loader?.querySelector("h1")

const enum Loading {
    MaxLoadingTextLen = 13,
    LoadingInterval = 250,
}

const enum Form {
    EmailInterval = 60_000,
    ProblemMax = 11,
}

if (loader && loading) {
    setInterval(() => {
        if (loader.classList.contains("active")) {
            if (loading.innerText.length >= Loading.MaxLoadingTextLen) {
                loading.innerText = "Sending"
            } else {
                loading.innerText = `${loading.innerText} .`
            }
        }
    }, Loading.LoadingInterval)
}

const verifyMathProblem = (problem: string, answer: string): boolean => {
    const numbers = problem.split(/\+|-/gu).map(Number)

    return numbers[0] + numbers[1] - numbers[2] === Number(answer)
}

const generateMathProblem = (): void => {
    const contactProblem = document.getElementById("contact-problem")

    if (contactProblem) {
        const numbers = [
            Math.floor(Math.random() * Form.ProblemMax),
            Math.floor(Math.random() * Form.ProblemMax),
            Math.floor(Math.random() * Form.ProblemMax),
        ]

        contactProblem.innerHTML = `<span>${numbers[0]}</span>+<span>${numbers[1]}</span>-<span>${numbers[2]}</span>` // Ugh stringed HTML
    }
}

;((form: HTMLElement | null): void => {
    if (form) {
        /* eslint-disable max-lines-per-function, max-statements */
        form.addEventListener("submit", (event): void => {
            event.preventDefault()

            /* eslint-disable max-len */
            const {value: name} = document.getElementById("contact-name") as HTMLInputElement
            const {value: email} = document.getElementById("contact-email") as HTMLInputElement
            const {value: comments} = document.getElementById(
                "contact-comments",
            ) as HTMLInputElement
            const problem = (document.getElementById(
                "contact-problem",
            ) as HTMLSpanElement).innerHTML
                .replace(/<span>/gu, "")
                .replace(/<\/span>/gu, "")
            const {value: answer} = document.getElementById("contact-answer") as HTMLInputElement
            /* eslint-enable max-len */

            if (!localStorage.getItem("lastEmailSent")) {
                localStorage.setItem("lastEmailSent", "0")
            }

            const lastEmailSent = Number(localStorage.getItem("lastEmailSent"))

            if (!name && !email && !comments && !answer) {
                alert("Please fill out all fields")

                return
            } else if (Date.now() - lastEmailSent <= Form.EmailInterval) {
                alert("Please wait before sending another email")

                return
            } else if (!verifyMathProblem(problem, answer)) {
                alert("Incorrect answer to math problem")

                generateMathProblem()

                return
            } else if (functions === undefined) {
                alert("There was a problem")

                return
            }

            loader?.classList.add("active")

            const sendEmail = functions.httpsCallable("contactFormSubmit")
            const sentEmail = sendEmail({
                name,
                email,
                desc: comments,
                problem,
                answer,
            })

            Promise.resolve(sentEmail).then((msg): void => {
                loader?.classList.remove("active")
                alert(msg.data.msg as string)

                if (msg.data.err as string | undefined) {
                    generateMathProblem()
                } else {
                    localStorage.setItem("lastEmailSent", Date.now().toString())
                }
            })
        })
        /* eslint-enable max-lines-per-function, max-statements */
    }
})(document.getElementById("contact-form"))

generateMathProblem()
