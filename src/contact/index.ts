/**
 * KK Cabinets
 * @copyright 2020 Luke Zhang, Ethan Lim
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

declare const functions: {[key: string]: any}

interface EmailReturn {
    msg: string,
    err?: boolean,
}

const loader = document.getElementById("loader"),
    loading = loader?.querySelector("h1")

if (loader && loading) {
    setInterval(() => {
        if (loader.classList.contains("active")) {
            if (loading.innerText.length >= 13) {
                loading.innerText = "Sending"
            } else {
                loading.innerText = `${loading.innerText} .`
            }
        }
    }, 250)
}

const verifyMathProblem = (problem: string, answer: string): boolean => eval(problem) === Number(answer);

((form: HTMLElement | null): void => {
    if (form) {
        form.addEventListener("submit", (event): void => {
            event.preventDefault()
        
            const name = (document.getElementById("contact-name") as HTMLInputElement).value,
                email = (document.getElementById("contact-email") as HTMLInputElement).value,
                comments = (document.getElementById("contact-comments") as HTMLInputElement).value,
                problem = (document.getElementById("contact-problem") as HTMLSpanElement)
                    .innerHTML
                    .replace(/<span>/ug, "")
                    .replace(/<\/span>/ug, ""),
                answer = (document.getElementById("contact-answer") as HTMLInputElement).value
        
            if (!localStorage.getItem("lastEmailSent")) {
                localStorage.setItem("lastEmailSent", "0")
            }
    
            const lastEmailSent = Number(localStorage.getItem("lastEmailSent"))
            
            if (!name && !email && !comments && !answer) {
                alert("Please fill out all fields")
    
                return
            } else if (Date.now() - lastEmailSent <= 60000) {
                alert("Please wait before sending another email")
    
                return
            } else if (!verifyMathProblem(problem, answer)) {
                alert("Incorrect answer to math problem")

                generateMathProblem()
                return
            }

            loader?.classList.add("active")
    
            const sendEmail = functions.httpsCallable("contactFormSubmit"),
                sentEmail = sendEmail({
                    name,
                    email,
                    desc: comments,
                    problem,
                    answer,
                })
    
            Promise.resolve(sentEmail).then((msg: {[key: string]: EmailReturn}): void => {
                loader?.classList.remove("active")
                alert(msg.data.msg)

                if (msg.data.err) {
                    generateMathProblem()
                } else {
                    localStorage.setItem("lastEmailSent", Date.now().toString())
                }
            })
        })
    }
})(document.getElementById("contact-form"));


const generateMathProblem = (): void => {
    const contactProblem = document.getElementById("contact-problem")

    if (contactProblem) {
        const numbers = [
            Math.floor(Math.random() * 11),
            Math.floor(Math.random() * 11),
            Math.floor(Math.random() * 11)
        ]

        contactProblem.innerHTML = `<span>${numbers[0]}</span>+<span>${numbers[1]}</span>-<span>${numbers[2]}</span>` // Ugh stringed HTML
    }
}

generateMathProblem()
