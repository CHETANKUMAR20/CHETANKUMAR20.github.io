/* =====================================
PORTFOLIO APP CONTROLLER
===================================== */

document.addEventListener("DOMContentLoaded", () => {

const pageContainer = document.getElementById("page-content")

const navLinks = document.querySelectorAll(".nav a")

const sidebar = document.getElementById("sidebar")
const menuToggle = document.getElementById("menuToggle")

const searchInput = document.getElementById("searchInput")
const themeToggle = document.getElementById("themeToggle")

/* MOBILE SIDEBAR */

const mobileSidebar = document.getElementById("mobileSidebar")
const mobileOverlay = document.getElementById("mobileOverlay")
const closeMobile = document.getElementById("closeMobile")
const mobileLinks = document.querySelectorAll(".mobile-nav-menu a")

/* =====================================
PAGE LOADER
===================================== */

async function loadPage(page){

try{

const res = await fetch(`pages/${page}.html`)
const html = await res.text()

pageContainer.innerHTML = html

/* reload icons */

if(window.lucide){
lucide.createIcons()
}

/* special page scripts */

if(page === "projects"){
loadRepos()
}

animateCounters()

}catch(err){

pageContainer.innerHTML = "<p>Unable to load page.</p>"

}

}

/* =====================================
DEFAULT PAGE
===================================== */

loadPage("dashboard")


/* =====================================
DESKTOP NAVIGATION
===================================== */

navLinks.forEach(link => {

link.addEventListener("click",(e)=>{

e.preventDefault()

const page = link.getAttribute("data-page")

navLinks.forEach(l => l.classList.remove("active"))
link.classList.add("active")

loadPage(page)

})

})


/* =====================================
SIDEBAR TOGGLE (DESKTOP)
===================================== */

menuToggle.addEventListener("click",()=>{

if(window.innerWidth < 900){

mobileSidebar.classList.add("active")
mobileOverlay.classList.add("active")

}else{

sidebar.classList.toggle("expanded")

}

})


/* =====================================
MOBILE SIDEBAR CLOSE
===================================== */

if(closeMobile){

closeMobile.addEventListener("click",()=>{

mobileSidebar.classList.remove("active")
mobileOverlay.classList.remove("active")

})

}

if(mobileOverlay){

mobileOverlay.addEventListener("click",()=>{

mobileSidebar.classList.remove("active")
mobileOverlay.classList.remove("active")

})

}


/* =====================================
MOBILE NAVIGATION
===================================== */

mobileLinks.forEach(link => {

link.addEventListener("click",(e)=>{

e.preventDefault()

const page = link.getAttribute("data-page")

loadPage(page)

mobileSidebar.classList.remove("active")
mobileOverlay.classList.remove("active")

})

})


/* =====================================
SEARCH SYSTEM
===================================== */

if(searchInput){

searchInput.addEventListener("input",()=>{

const term = searchInput.value.toLowerCase()

const cards = document.querySelectorAll(".card")

cards.forEach(card => {

const text = card.innerText.toLowerCase()

if(text.includes(term)){
card.style.display="block"
}else{
card.style.display="none"
}

})

})

}


/* =====================================
THEME TOGGLE
===================================== */

const savedTheme = localStorage.getItem("theme")

if(savedTheme === "light"){
document.body.classList.add("light")
}

themeToggle.addEventListener("click",toggleTheme)

function toggleTheme(){

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
localStorage.setItem("theme","light")
}else{
localStorage.setItem("theme","dark")
}

}


/* =====================================
INIT ICONS
===================================== */

if(window.lucide){
lucide.createIcons()
}

})


/* =====================================
LOAD GITHUB REPOSITORIES
===================================== */

async function loadRepos(){

const container = document.getElementById("repo-container")

if(!container) return

container.innerHTML = "Loading repositories..."

try{

const res = await fetch("https://api.github.com/users/CHETANKUMAR20/repos")

const data = await res.json()

const repos = data
.filter(repo => !repo.fork)
.sort((a,b)=> b.stargazers_count - a.stargazers_count)

container.innerHTML = ""

repos.slice(0,8).forEach(repo => {

const card = document.createElement("div")
card.className = "card"

card.innerHTML = `

<h3>${repo.name}</h3>

<p>${repo.description || "No description available."}</p>

<div class="repo-meta">

<span class="lang">${repo.language || "Code"}</span>

<span>⭐ ${repo.stargazers_count}</span>

<span>🍴 ${repo.forks_count}</span>

</div>

<a href="${repo.html_url}" target="_blank">
View Repository →
</a>

`

container.appendChild(card)

})

}catch(err){

container.innerHTML = "Unable to load repositories."

}

}


/* =====================================
ANIMATED COUNTERS
===================================== */

function animateCounters(){

const counters = document.querySelectorAll(".counter")

counters.forEach(counter => {

const target = +counter.getAttribute("data-target")

let count = 0

const speed = target / 80

function update(){

count += speed

if(count < target){

counter.innerText = Math.floor(count)

requestAnimationFrame(update)

}else{

counter.innerText = target

}

}

update()

})

}
