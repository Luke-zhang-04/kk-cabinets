/**
 * KK Cabinets
 * Copyright (C) 2020  Luke Zhang, Ethan Lim
 * 
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
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

let timelines = []
let scenes = []
const controller = new ScrollMagic.Controller()
let alternating = 0
let multiplyer 

let displayedTestimonial
let para = document.getElementById("testimonial")
db.collection("testimonials").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        getTestimonials(doc.data())
    })
})

function getTestimonials(obj) {
    let list = Object.values(obj)
    displayedTestimonial = list[Math.floor(Math.random()*list.length)]
    para.innerHTML = displayedTestimonial
}

if ($( window ).width() >= 767) {
    $(".content").each(function() {
        multiplyer = (alternating % 2 === 0 ? 1 : -1)
        let tl = new TimelineMax();
        timelines.push(tl)
        tl.from($(this).find("h5 article"), .5, {x:200*multiplyer, opacity: 0})
        tl.from($(this).find("h5 span"), 1, { width: 0}, "=-.5")
        tl.from($(this).find("h5 p"), 1, {x:200*multiplyer, opacity: 0}, "=-.75")
        tl.from($(this).find("h5 .btn"), 1, {x:200*multiplyer, opacity: 0}, "-.25")
        tl.from($(this).find(".ci1"), 1, {x:-200*multiplyer, opacity: 0,ease: Power4.easeInOut}, "=-1")
        tl.from($(this).find(".ci2"), 1, {x:200*multiplyer, opacity: 0, ease: Power4.easeInOut}, "=-.7")
        const scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: "onLeave",
            duration: "250%"
        })
        .setPin(this)
        .setTween(tl)
        .addTo(controller)

        scenes.push(scene)
        alternating++
    })
}

$("#downBtn").on("click", function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "" && this.hash) {
        // Prevent default anchor click behavior
        event.preventDefault()

        // Store hash
        var hash = this.hash

        // Using jQuery"s animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $("html, body").animate({
            scrollTop: $(hash).offset().top - $(window).height()
        }, 800, function(){
 
            // Add hash (#) to URL when done scrolling (default click behavior)
        })
    } // End if
})