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

$(document).ready(function(){
    // Add smooth scrolling to all links
    $(".card").on("click", function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "" && this.hash) {
            // Prevent default anchor click behavior
            event.preventDefault()
  
            // Store hash
            var hash = this.hash
  
            // Using jQuery"s animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
     
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash
            })
        } // End if
    })
})