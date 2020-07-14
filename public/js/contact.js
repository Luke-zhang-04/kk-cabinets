"use strict";/**
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
 */var form=document.getElementById("contact-form");if(form){form.addEventListener("submit",function(event){event.preventDefault();var name=document.getElementById("contact-name").value,email=document.getElementById("contact-email").value,comments=document.getElementById("contact-comments").value;if(!localStorage.getItem("lastEmailSent")){localStorage.setItem("lastEmailSent","0")}var lastEmailSent=Number(localStorage.getItem("lastEmailSent"));if(!name&&!email&&!comments){alert("Please fill out all fields");return}else if(Date.now()-lastEmailSent<=300000){alert("Please wait before sending another email");return}var sendEmail=functions.httpsCallable("contactFormSubmit"),sentEmail=sendEmail({name:name,email:email,desc:comments});Promise.resolve(sentEmail).then(function(msg){alert(msg.data);localStorage.setItem("lastEmailSent",Date.now().toString())})})}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCQSxHQUFNLENBQUEsSUFBSSxDQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCLENBQWIsQ0FFQSxHQUFJLElBQUosQ0FBVSxDQUNOLElBQUksQ0FBQyxnQkFBTCxDQUFzQixRQUF0QixDQUFnQyxTQUFDLEtBQUQsQ0FBZ0IsQ0FDNUMsS0FBSyxDQUFDLGNBQU4sR0FFQSxHQUFNLENBQUEsSUFBSSxDQUFJLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCLEVBQTZELEtBQTNFLENBQ0ksS0FBSyxDQUFJLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCLEVBQThELEtBRDNFLENBRUksUUFBUSxDQUFJLFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4QixFQUFpRSxLQUZqRixDQUlBLEdBQUksQ0FBQyxZQUFZLENBQUMsT0FBYixDQUFxQixlQUFyQixDQUFMLENBQTRDLENBQ3hDLFlBQVksQ0FBQyxPQUFiLENBQXFCLGVBQXJCLENBQXNDLEdBQXRDLENBQ0gsQ0FFRCxHQUFNLENBQUEsYUFBYSxDQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBYixDQUFxQixlQUFyQixDQUFELENBQTVCLENBRUEsR0FBSSxDQUFDLElBQUQsRUFBUyxDQUFDLEtBQVYsRUFBbUIsQ0FBQyxRQUF4QixDQUFrQyxDQUM5QixLQUFLLENBQUMsNEJBQUQsQ0FBTCxDQUVBLE1BQ0gsQ0FKRCxJQUlPLElBQUksSUFBSSxDQUFDLEdBQUwsR0FBYSxhQUFiLEVBQThCLE1BQWxDLENBQTBDLENBQzdDLEtBQUssQ0FBQywwQ0FBRCxDQUFMLENBRUEsTUFDSCxDQUVELEdBQU0sQ0FBQSxTQUFTLENBQUcsU0FBUyxDQUFDLGFBQVYsQ0FBd0IsbUJBQXhCLENBQWxCLENBQ0ksU0FBUyxDQUFHLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBSixJQUFELENBQU8sS0FBSyxDQUFMLEtBQVAsQ0FBYyxJQUFJLENBQUUsUUFBcEIsQ0FBRCxDQUR6QixDQUdBLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFNBQWhCLEVBQTJCLElBQTNCLENBQWdDLFNBQUMsR0FBRCxDQUF1QyxDQUNuRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUwsQ0FBTCxDQUVBLFlBQVksQ0FBQyxPQUFiLENBQXFCLGVBQXJCLENBQXNDLElBQUksQ0FBQyxHQUFMLEdBQVcsUUFBWCxFQUF0QyxDQUNILENBSkQsQ0FLSCxDQS9CRCxDQWdDSCIsInNvdXJjZVJvb3QiOiIifQ==