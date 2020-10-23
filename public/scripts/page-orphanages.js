// instanciando o mapa da biblioteca
// cria um objeto L da biblioteca Leaflet
// ([latitude, longitude], zoom)
const map = L.map('mapid').setView([-54.1570127,-37.534041], 10);

// criacao do titulo e camda de titulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// criacao do icone e popup
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [50, 60],
    iconAnchor: [29, 68],
    popupAnchor: [195, 2]
})

// os parametros contem desestruturacao do orphanage
// funcao que cria marcadores de acordo com os argumentos deum orfanato
function addMarker ({id, name, lat, lng}) {

    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg"></a>`)
    
    // [latitude, longitude]
    L.marker([lat, lng], {icon})
    .addTo(map)
    .bindPopup(popup)
}

// pega os orfanatos criados e roda uma funcao que os adiciona ao mapa
const orphanagesSpan = document.querySelectorAll('.orphanages span')
console.log(orphanagesSpan)
orphanagesSpan.forEach(span => {
    console.log('entrou na function ')
    // dataset faz parte do html element
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
  }
    addMarker(orphanage);
})