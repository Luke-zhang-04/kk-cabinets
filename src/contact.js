"use strict";
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
const loader = document.getElementById("loader"), loading = loader === null || loader === void 0 ? void 0 : loader.querySelector("h1");
if (loader && loading) {
    setInterval(() => {
        if (loader.classList.contains("active")) {
            if (loading.innerText.length >= 13) {
                loading.innerText = "Sending";
            }
            else {
                loading.innerText = `${loading.innerText} .`;
            }
        }
    }, 250);
}
const verifyMathProblem = (problem, answer) => eval(problem) === Number(answer);
((form) => {
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("contact-name").value, email = document.getElementById("contact-email").value, comments = document.getElementById("contact-comments").value, problem = document.getElementById("contact-problem")
                .innerHTML
                .replace(/<span>/ug, "")
                .replace(/<\/span>/ug, ""), answer = document.getElementById("contact-answer").value;
            if (!localStorage.getItem("lastEmailSent")) {
                localStorage.setItem("lastEmailSent", "0");
            }
            const lastEmailSent = Number(localStorage.getItem("lastEmailSent"));
            if (!name && !email && !comments && !answer) {
                alert("Please fill out all fields");
                return;
            }
            else if (Date.now() - lastEmailSent <= 60000) {
                alert("Please wait before sending another email");
                return;
            }
            else if (!verifyMathProblem(problem, answer)) {
                alert("Incorrect answer to math problem");
                generateMathProblem();
                return;
            }
            loader === null || loader === void 0 ? void 0 : loader.classList.add("active");
            const sendEmail = functions.httpsCallable("contactFormSubmit"), sentEmail = sendEmail({
                name,
                email,
                desc: comments,
                problem,
                answer,
            });
            Promise.resolve(sentEmail).then((msg) => {
                loader === null || loader === void 0 ? void 0 : loader.classList.remove("active");
                alert(msg.data.msg);
                if (msg.data.err) {
                    generateMathProblem();
                }
                else {
                    localStorage.setItem("lastEmailSent", Date.now().toString());
                }
            });
        });
    }
})(document.getElementById("contact-form"));
const generateMathProblem = () => {
    const contactProblem = document.getElementById("contact-problem");
    if (contactProblem) {
        const numbers = [
            Math.floor(Math.random() * 11),
            Math.floor(Math.random() * 11),
            Math.floor(Math.random() * 11)
        ];
        contactProblem.innerHTML = `<span>${numbers[0]}</span>+<span>${numbers[1]}</span>-<span>${numbers[2]}</span>`;
    }
};
generateMathProblem();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFTSCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUM1QyxPQUFPLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUV6QyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7SUFDbkIsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO2FBQ2hDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUE7YUFDL0M7U0FDSjtJQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtDQUNWO0FBRUQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFekcsQ0FBQyxDQUFDLElBQXdCLEVBQVEsRUFBRTtJQUNoQyxJQUFJLElBQUksRUFBRTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQVEsRUFBRTtZQUM1QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7WUFFdEIsTUFBTSxJQUFJLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUMsS0FBSyxFQUM1RSxLQUFLLEdBQUksUUFBUSxDQUFD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