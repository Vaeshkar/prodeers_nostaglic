/* DOM Tags */
const cursorTag = document.querySelector("div.cursor")
const yearTag = document.querySelector(".current-year")
const wilsonTag = document.querySelector(".wilson")
const headerTag = document.querySelector(".header")
const stickyTag = document.querySelector(".sticky")
const logoTag = document.querySelector(".logo")
const mouseTargets = document.querySelectorAll("a")
const bodyTag = document.querySelector("body")
const progressTag = document.querySelector("div.progress")
const sections = document.querySelectorAll("section")


/* Footer Copyright */
/* collect the current year for Copyright 
 * and write a new p tag with the current owner link 
 */
let setTime = function () {
  const d = new Date()
  setDate = d.getFullYear()
  yearTag.insertAdjacentHTML('afterbegin', "<p>Copyright &copy; " + setDate + " – " + " <a href='https://hirschen.com' target='_blank' rel='noopener' alt='go to Zum goldenen Hirschen website'>Zum goldenen Hirschen GmbH.</a></p>")
  yearTag.insertAdjacentHTML('afterbegin', "<p>Hand coded with <img class='wilson' src='./img/heart-solid.svg' alt='heart icon'>love. Learned with <img src='./img/footer-wilson.svg' alt='wilson' class='wilson'> <a href='https://www.superhi.com/?r=Vaeshkar' target='_blank' rel='noopener' alt='go to Superhi website'>SuperHi.</a></p>")
}
setTime()

/* Header skew */
const toggleHeader = function () {
  const pixels = window.pageYOffset
  if (pixels >= 40) {
    stickyTag.classList.add("scrolled")
    logoTag.classList.add("logo-scale")
  } else {
    stickyTag.classList.remove("scrolled")
    logoTag.classList.remove("logo-scale")
  }
}

const fadeBox = function () {
  const pixels = window.pageYOffset
  const alpha = Math.min(pixels / 1000, 0.25)
  stickyTag.style.boxShadow = (`0 0 10px rgba(0, 0, 0, ${alpha})`)
}

toggleHeader()
fadeBox()

document.addEventListener("scroll", function () {
  toggleHeader()
  fadeBox()
})

/* Menu */
$('.menu-toggle').on('click', function () {

  $('.menu').toggleClass('open')

  return false
})



const skrinkCursor = function () {
  cursorTag.classList.remove("is-down")
  /* 
    cursorTag.innerHTML = `<span>Click me!</span>` */
}

// when I hold the mouse down, make the cursor bigger
const growCursor = function () {
  cursorTag.classList.add("is-down")
  /* 
    cursorTag.innerHTML = `<span>Let go please!</span>` */
}

// move the cursor, based on the coordinates
const moveCursor = function (x, y) {
  cursorTag.style.left = x + "px"
  cursorTag.style.top = y + "px"
}

const hoverCursor = function () {
  cursorTag.classList.add("is-hover")
}

const hoverCursorRemove = function () {
  cursorTag.classList.remove("is-hover")
}

mouseTargets.forEach(target => {
  target.addEventListener("mouseenter", () => {
    hoverCursor()
  })
  target.addEventListener("mouseleave", () => {
    hoverCursorRemove()
  })
})

/* EventListeners */
document.addEventListener("mouseup", function () {
  skrinkCursor()
  isMouseDown = false
})

document.addEventListener("mousedown", function () {
  growCursor()
  isMouseDown = true
})

document.addEventListener("mousemove", function (event, x, y) {
  //console.log(event)
  // event.pageX -> where the mouse is across the page
  // event.pageY -> where the mouse is downwards the page
  moveCursor(event.pageX, event.pageY)
})

// when we scroll the page, make a progressbar
// that keeps track of the distance
document.addEventListener("scroll", function () {
  // Gets the browser window scrolled Y information
  // and saves it to the {pixels} const
  const pixels = window.pageYOffset
  // Saves the <body>.height to the set {pageHeight} const
  const pageHeight = bodyTag.getBoundingClientRect().height
  // Caluculates the real document height with the given window
  // and sets it to the given const
  const totalScrollableDistance = pageHeight - window.innerHeight
  // To have a working value for a progressbar we need to convert it to a percentage
  const percentage = pixels / totalScrollableDistance
  // Update the progressbar div with an instyle value. 
  // The percentage is only 0 to 1%, need to be multiplied by hundred to get a 0% to 100% value
  progressTag.style.width = `${100 * percentage}%`
})

// When we scroll down we want to messure the middle of each section 
// We have to scan the value from the {document} and the {window} model
document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset
  const midViewport = topViewport + (window.innerHeight / 2)

  sections.forEach(section => {
    const topSection = section.offsetTop
    const midSection = topSection + (section.offsetHeight / 2)

    const distanceToSection = midViewport - midSection
    // Grabbing the data attr HTML and saving it to a new local const 
    const parallaxTag = section.querySelectorAll(`[data-parallax]`)

    // Loop over all {parallaxTag} to find the [data-parallax] attribute
    parallaxTag.forEach(tag => {
      // the found data inside the data attr tag and saving it to tne local const {speed}
      const speed = tag.getAttribute("data-parallax")
      // Set the style to the givin tag with the collected data from above
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`
    })
  })
})

/* Slick Slideshow */
$(document).ready(function () {
  $('.autoplay').slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    mobileFirst: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    swipe: true,
    touchMove: true,
  });
});