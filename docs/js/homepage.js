let timelines = []
let scenes = []
const controller = new ScrollMagic.Controller()
let alternating = 0;

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
    para.innerHTML = "\"" + displayedTestimonial + "\""
}

if ($( window ).width() >= 767) {
    $(".content").each(function() {
        if (alternating % 2 == 0) {
            let tl = new TimelineMax();
            timelines.push(tl)
            tl.from($(this).find("h5 article"), .5, {x:200, opacity: 0})
            tl.from($(this).find("h5 span"), 1, { width: 0}, "=-.5")
            tl.from($(this).find("h5 p"), 1, {x:200, opacity: 0}, "=-.75")
            tl.from($(this).find("h5 button"), 1, {x:200, opacity: 0}, "-.25")
            tl.from($(this).find(".ci1"), 1, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1")
            tl.from($(this).find(".ci2"), 1, {x:200, opacity: 0, ease: Power4.easeInOut}, "=-.7")
            const scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: "onLeave",
                duration: "250%"
            })
            .setPin(this)
            .setTween(tl)
            .addTo(controller)

            scenes.push(scene)
        } else {
            let tl = new TimelineMax();
            timelines.push(tl)
            tl.from($(this).find("h5 article"), .5, {x:-200, opacity: 0})
            tl.from($(this).find("h5 span"), 1, { width: 0}, "=-.5")
            tl.from($(this).find("h5 p"), 1, {x:-200, opacity: 0}, "=-.75")
            tl.from($(this).find("h5 button"), 1, {x:-200, opacity: 0}, "-.25")
            tl.from($(this).find(".ci1"), 1, {x:200, opacity: 0,ease: Power4.easeInOut}, "=-1")
            tl.from($(this).find(".ci2"), 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-.7")
            const scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: "onLeave",
                duration: "250%"
            })
            .setPin(this)
            .setTween(tl)
            .addTo(controller)

            scenes.push(scene)
        }
        alternating++
    })
}