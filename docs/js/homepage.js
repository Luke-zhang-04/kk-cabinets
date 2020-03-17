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