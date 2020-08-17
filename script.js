const result = document.getElementById('result');
const album = document.getElementById('album');
const form = document.getElementById('form');
let btnSearch = document.getElementById('btn_search');
let displayLyrics = document.getElementById('displayLyrics');


btnSearch.addEventListener('click', function(){
const search = document.getElementById('search').value;
fetch(`https://api.lyrics.ovh/suggest/${search}`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < 10; i++) {
            let info=(data.data[i]);
            console.log(info);
            result.innerHTML +=`<div class= "single-result row align-items-center my-3 p-3">
            <div class="col-md-3 img-fluid">
            <img src="${info.artist.picture}" alt="cover of ${info.album.title}">
            </div>
            <div class="col-md-6">
                <h3 class="lyrics-name">${info.title}</h3>
                <p class="author lead">${info.album.title} by <span>${info.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics('${info.artist.name}', '${info.title}', '${info.title}', '${info.artist.name}')">Get Lyrics</button>
            </div>
        </div>`
        }
    })
    result.innerHTML="";
});
const apiURL = "https://api.lyrics.ovh"
function getLyrics(artist, title, songTitle, artistName) {
    const API = `${apiURL}/v1/${artist}/${title}`;
    fetch(API)
    .then(response => {return response.json()})
        .then((data) => {
            displayLyrics.innerHTML = `
                <button class="btn btn-success mb-3 go-back" onclick="goBack()">Return..</button>
                <h2 class="text-success mb-4">${artistName} - ${songTitle}</h2>
                <pre class="lyric text-white">${
                !data.lyrics ? data.error : data.lyrics
                }</pre>
            `;
            result.style.display = "none";

        });
}

function goBack() {
    result.style.display = "block";
    displayLyrics.innerHTML = "";
}

