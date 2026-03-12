document.addEventListener("DOMContentLoaded", () => {

/* =========================
BOOT SCREEN
========================= */


window.addEventListener("load", () => {

setTimeout(()=>{

document.getElementById("boot-screen").style.display="none"

document.getElementById("portfolio").classList.remove("hidden")

},4500)

})


/* =========================
TERMINAL
========================= */

const terminalInput = document.getElementById("terminal-input")
const terminalOutput = document.getElementById("terminal-output")

if(terminalInput){

terminalInput.addEventListener("keydown",(e)=>{

if(e.key === "Enter"){

const command = terminalInput.value.trim()

printOutput("visitor@chetan:~$ " + command)

handleCommand(command)

terminalInput.value=""

}

})

}

function printOutput(text){

const line = document.createElement("div")

line.textContent=text

terminalOutput.appendChild(line)

terminalOutput.scrollTop = terminalOutput.scrollHeight

}

function handleCommand(cmd){

switch(cmd){

case "help":
printOutput("Available commands:")
printOutput("about")
printOutput("skills")
printOutput("projects")
printOutput("contact")
printOutput("clear")
break

case "about":
printOutput("Chetan Kumar - UI/UX Designer and DevOps learner.")
break

case "skills":
printOutput("UI/UX")
printOutput("Docker")
printOutput("AWS")
printOutput("Linux")
printOutput("DevOps")
break

case "projects":
printOutput("Wallpaper Hub")
printOutput("Portfolio System")
printOutput("AI Resume Analyzer")
break

case "contact":
printOutput("Email: chetan@example.com")
break

case "clear":
terminalOutput.innerHTML=""
break

default:
printOutput("Command not found. Type 'help'")
}

}


/* =========================
GITHUB PROJECTS
========================= */

async function loadGithubProjects(){

const container = document.getElementById("projects-container")

if(!container) return

try{

const response = await fetch(
"https://api.github.com/users/CHETANKUMAR20/repos?sort=updated"
)

const repos = await response.json()

container.innerHTML = ""

repos
.filter(repo => !repo.fork)   // remove forked repos
.slice(0,6)
.forEach(repo => {

const card = document.createElement("div")

card.className = "project-card reveal"

card.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description || "No description available"}</p>
<a href="${repo.html_url}" target="_blank">View Repository</a>
`

container.appendChild(card)

})

}catch(error){

console.error("GitHub API error:", error)

container.innerHTML = "Unable to load projects."

}

}

document.addEventListener("DOMContentLoaded", loadGithubProjects)


/* =========================
GITHUB STATS
========================= */

async function loadGithubStats(){

try{

const response=await fetch("https://api.github.com/users/CHETANKUMAR20")

const data=await response.json()

document.getElementById("repo-count").textContent=data.public_repos
document.getElementById("followers-count").textContent=data.followers
document.getElementById("following-count").textContent=data.following

document.getElementById("account-created").textContent=
new Date(data.created_at).getFullYear()

}catch(err){

console.error("GitHub stats error:",err)

}

}

loadGithubStats()


/* =========================
PHOTOGRAPHY LIGHTBOX
========================= */

const photos=document.querySelectorAll(".photo-grid img")
const lightbox=document.getElementById("lightbox")
const lightboxImg=document.getElementById("lightbox-img")

photos.forEach(photo=>{

photo.addEventListener("click",()=>{

lightbox.style.display="flex"
lightboxImg.src=photo.src

})

})

lightbox.addEventListener("click",()=>{

lightbox.style.display="none"

})


/* =========================
PARTICLES BACKGROUND
========================= */

if(window.particlesJS){

particlesJS("particles-js",{

particles:{
number:{value:80},
color:{value:"#38bdf8"},
shape:{type:"circle"},
opacity:{value:0.5},
size:{value:3},

line_linked:{
enable:true,
distance:150,
color:"#38bdf8",
opacity:0.4,
width:1
},

move:{
enable:true,
speed:2
}
},

interactivity:{
events:{
onhover:{
enable:true,
mode:"grab"
}
},

modes:{
grab:{
distance:140,
line_linked:{opacity:1}
}
}

}

})

}


/* =========================
COMMAND PALETTE
========================= */

const palette=document.getElementById("command-palette")
const commandInput=document.getElementById("command-input")

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="k"){

e.preventDefault()

palette.style.display="block"

commandInput.focus()

}

})

document.addEventListener("click",(e)=>{

if(e.target.dataset.target){

document.querySelector(e.target.dataset.target)
.scrollIntoView({behavior:"smooth"})

palette.style.display="none"

}

if(e.target.dataset.link){

window.open(e.target.dataset.link)

palette.style.display="none"

}

})

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){
palette.style.display="none"
}

})


/* =========================
MOBILE MENU
========================= */

const menuToggle=document.getElementById("menuToggle")
const navLinks=document.getElementById("navLinks")

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active")

})


/* =========================
SCROLL REVEAL
========================= */

const reveals=document.querySelectorAll(".reveal")

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.classList.add("active")
}

})

},{threshold:0.2})

reveals.forEach(el=>observer.observe(el))

})