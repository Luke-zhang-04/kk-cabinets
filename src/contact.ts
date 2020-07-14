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

const form = document.getElementById("contact-form")

if (form) {
    form.addEventListener("submit", (event): void => {
        event.preventDefault()
    
        const name = (document.getElementById("contact-name") as HTMLInputElement).value,
            email = (document.getElementById("contact-email") as HTMLInputElement).value,
            comments = (document.getElementById("contact-comments") as HTMLInputElement).value
    
        if (!localStorage.getItem("lastEmailSent")) {
            localStorage.setItem("lastEmailSent", "0")
        }

        const lastEmailSent = Number(localStorage.getItem("lastEmailSent"))
        
        if (!name && !email && !comments) {
            alert("Please fill out all fields")

            return
        } else if (Date.now() - lastEmailSent <= 60000) {
            alert("Please wait before sending another email")

            return
        }

        const sendEmail = functions.httpsCallable("contactFormSubmit"),
            sentEmail = sendEmail({name, email, desc: comments})

        Promise.resolve(sentEmail).then((msg: {[key: string]: string}): void => {
            alert(msg.data)

            localStorage.setItem("lastEmailSent", Date.now().toString())
        })
    })
}

