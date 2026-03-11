/* ------------------------------
GITHUB REPOSITORIES LOADER
------------------------------ */

const container = document.getElementById("repo-container");

async function loadRepos() {

if(!container) return;

container.innerHTML = "<p>Loading repositories...</p>";

try {

const res = await fetch("https://api.github.com/users/CHETANKUMAR20/repos");

const data = await res.json();

/* filter + sort */

const repos = data
.filter(repo => !repo.fork)
.sort((a,b)=> b.stargazers_count - a.stargazers_count);

container.innerHTML = "";

repos.forEach(repo => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `

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

} catch(err){

container.innerHTML = "Unable to load repositories.";

}

}

loadRepos();

/* ------------------------------
SIDEBAR TOGGLE
------------------------------ */

const toggle = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

if(toggle && sidebar){

toggle.addEventListener("click", () => {

sidebar.classList.toggle("collapsed");

});

}

/* ------------------------------
THEME TOGGLE (REMEMBER USER)
------------------------------ */

const themeToggle = document.getElementById("themeToggle");

/* load saved theme */

if(localStorage.getItem("theme") === "light"){

document.body.classList.add("light");

}

if(themeToggle){

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light");

}else{

localStorage.setItem("theme","dark");

}

});

}

/* ------------------------------
INIT ICONS
------------------------------ */

if(window.lucide){

lucide.createIcons();

}
