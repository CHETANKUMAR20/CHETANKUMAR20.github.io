/* ===============================
PAGE LOADER
=============================== */

const pageContainer = document.getElementById("page-content");
const navLinks = document.querySelectorAll(".nav-menu a");

async function loadPage(page){

try{

const res = await fetch(`pages/${page}.html`);
const html = await res.text();

pageContainer.innerHTML = html;

/* reload lucide icons */

if(window.lucide){
lucide.createIcons();
}

/* reload github repos if needed */

if(page === "projects"){
loadRepos();
}

}catch(err){

pageContainer.innerHTML = "<p>Unable to load page.</p>";

}

}

/* default page */

loadPage("dashboard");

/* navigation click */

navLinks.forEach(link => {

link.addEventListener("click",(e)=>{

e.preventDefault();

const page = link.getAttribute("data-page");

loadPage(page);

});

});


/* ===============================
SEARCH FUNCTION
=============================== */

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const term = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

const text = card.innerText.toLowerCase();

if(text.includes(term)){
card.style.display="block";
}else{
card.style.display="none";
}

});

});

}


/* ===============================
GITHUB REPOSITORIES LOADER
=============================== */

async function loadRepos(){

const container = document.getElementById("repo-container");

if(!container) return;

container.innerHTML="Loading repositories...";

try{

const res = await fetch("https://api.github.com/users/CHETANKUMAR20/repos");

const data = await res.json();

const repos = data
.filter(repo => !repo.fork)
.sort((a,b)=> b.stargazers_count - a.stargazers_count);

container.innerHTML="";

repos.forEach(repo=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${repo.name}</h3>

<p>${repo.description || "No description provided."}</p>

<div class="repo-meta">

<span>${repo.language || "Code"}</span>
<span>⭐ ${repo.stargazers_count}</span>

</div>

<a href="${repo.html_url}" target="_blank">
View Repository →
</a>

`;

container.appendChild(card);

});

}catch(err){

container.innerHTML="Unable to load repositories.";

}

}


/* ===============================
SIDEBAR TOGGLE
=============================== */

const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {

if (window.innerWidth <= 900) {

sidebar.classList.toggle("mobile-open");

} else {

sidebar.classList.toggle("collapsed");

}

});


/* ===============================
THEME TOGGLE
=============================== */

const themeToggle=document.getElementById("themeToggle");

/* load saved theme */

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="light"){
document.body.classList.add("light");
}

if(themeToggle){

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
localStorage.setItem("theme","light");
}else{
localStorage.setItem("theme","dark");
}

});

}


/* ===============================
ICON INIT
=============================== */

if(window.lucide){
lucide.createIcons();
}

const sidebarToggle = document.getElementById("toggleSidebar");

sidebarToggle.addEventListener("click", () => {

if(window.innerWidth < 900){
sidebar.classList.toggle("open");
}else{
sidebar.classList.toggle("collapsed");
}

});