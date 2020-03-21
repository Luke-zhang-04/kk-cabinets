let controller = new ScrollMagic.Controller()
let scene = new ScrollMagic.Scene({
    offset: 0, // start scene after scrolling for 100px
    duration: 400, // pin the element for 400px of scrolling
}).setClassToggle("#headerLogo", 'fade-in').addTo(controller)
