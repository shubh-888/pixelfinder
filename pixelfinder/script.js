
const accessKey = "4RExdWlI3so5uXdmf1R6Q-Mzk8gXnta8KIj2aWTSZt4";

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const searchResult = document.getElementById("search-result");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pageNumber = document.getElementById("page-number");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const downloadBtn = document.getElementById("download-btn");
const close = document.getElementById("close");

const darkBtn = document.getElementById("darkmode");

let page = 1;
let query = "nature";
let currentImageURL = "";


/* LOAD IMAGES */

async function loadImages(){

const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;

const res = await fetch(url);
const data = await res.json();

searchResult.innerHTML = "";

data.results.forEach(img => {

const div = document.createElement("div");
div.className = "image";

div.innerHTML = `
<img src="${img.urls.small}" alt="">
<div class="overlay">${img.alt_description || "Beautiful Image"}</div>
`;

div.addEventListener("click", () => {
openModal(img.urls.full);
});

searchResult.appendChild(div);

});

pageNumber.textContent = page;

}


/* OPEN MODAL */

function openModal(url){

modal.style.display = "flex";
modalImg.src = url;
currentImageURL = url;

}


/* DOWNLOAD IMAGE */

downloadBtn.addEventListener("click", async () => {

const response = await fetch(currentImageURL);
const blob = await response.blob();

const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "image.jpg";

document.body.appendChild(link);
link.click();
document.body.removeChild(link);

});


/* SEARCH FORM */

form.addEventListener("submit",(e)=>{

e.preventDefault();

query = searchInput.value;
page = 1;

loadImages();

});


/* PAGINATION */

next.addEventListener("click",()=>{

page++;
loadImages();

});

prev.addEventListener("click",()=>{

if(page > 1){
page--;
loadImages();
}

});


/* CLOSE MODAL */

close.addEventListener("click",()=>{
modal.style.display = "none";
});


/* CLOSE MODAL WHEN CLICK OUTSIDE */

modal.addEventListener("click",(e)=>{

if(e.target === modal){
modal.style.display = "none";
}

});


/* DARK MODE */

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
darkBtn.textContent = "☀ Light";
}else{
darkBtn.textContent = "🌙 Dark";
}

});


/* LOAD TRENDING IMAGES ON PAGE LOAD */

loadImages();

