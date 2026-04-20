// asetetaan avain
const api = 'f195eafd4e9782a063b9e7fe3f3ab512';
const base_url = 'https://ws.audioscrobbler.com/2.0/';


function etsiArtisti() {
    const artisti = document.getElementById('artistinhaku').value;

    if (artisti === '') {
        alert("Haku kenttä on tyhjä!")
        return;
    }

    const url = `${base_url}?method=artist.gettopalbums&artist=${encodeURIComponent(artisti)}&api_key=${api}&format=json`;

    fetch(url)
    .then(vastaus => vastaus.json())
    .then(data => {
        const albumit = data.topalbums.album;
        esitaAlbumit(albumit);
    })
}

function esitaAlbumit(albums) {
    const container = document.getElementById('album-varasto');

    for (let x = 0; x < albums.length; x++) {
        const album = albums[x];

        const albumDiv = document.createElement('div');
        albumDiv.className = 'album-card';

        const kuvaUrl = album.image[2]['#text'];

        const albumLinkki = album.url;

        albumDiv.innerHTML = `
            <img src="${kuvaUrl}" style="width:150px; margin: 10px;">
            <h3>${album.name}</h3>
            <button onclick="window.open('${albumLinkki}')">Listen</button>
        `;
        
        container.appendChild(albumDiv);
    }
}

function tyhjenna() {
    const varasto = document.getElementById('album-varasto');
    varasto.innerHTML = ''
};