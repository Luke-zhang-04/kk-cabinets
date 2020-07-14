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
const form = document.getElementById("contact-form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("contact-name").value, email = document.getElementById("contact-email").value, comments = document.getElementById("contact-comments").value;
        if (!localStorage.getItem("lastEmailSent")) {
            localStorage.setItem("lastEmailSent", "0");
        }
        const lastEmailSent = Number(localStorage.getItem("lastEmailSent"));
        if (!name && !email && !comments) {
            alert("Please fill out all fields");
            return;
        }
        else if (Date.now() - lastEmailSent <= 60000) {
            alert("Please wait before sending another email");
            return;
        }
        const sendEmail = functions.httpsCallable("contactFormSubmit"), sentEmail = sendEmail({ name, email, desc: comments });
        Promise.resolve(sentEmail).then((msg) => {
            alert(msg.data);
            localStorage.setItem("lastEmailSent", Date.now().toString());
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFJSCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBRXBELElBQUksSUFBSSxFQUFFO0lBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBUSxFQUFFO1FBQzVDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUV0QixNQUFNLElBQUksR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQyxLQUFLLEVBQzVFLEtBQUssR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBc0IsQ0FBQyxLQUFLLEVBQzVFLFFBQVEsR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFzQixDQUFDLEtBQUssQ0FBQTtRQUV0RixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUN4QyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUM3QztRQUVELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7UUFFbkUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM5QixLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtZQUVuQyxPQUFNO1NBQ1Q7YUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxhQUFhLElBQUksS0FBSyxFQUFFO1lBQzVDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1lBRWpELE9BQU07U0FDVDtRQUVELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFDMUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUE7UUFFeEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUE0QixFQUFRLEVBQUU7WUFDbkUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVmLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ2hFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7Q0FDTCJ9