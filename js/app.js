const container = document.getElementById("repo-container");

fetch("https://api.github.com/users/CHETANKUMAR20/repos")
.then(res => res.json())
.then(data => {

data.forEach(repo => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description || "No description provided."}</p>
<a href="${repo.html_url}" target="_blank">View Repository →</a>
`;

container.appendChild(card);

});

});