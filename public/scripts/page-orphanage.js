// cria configuracaoes para o mapa para evitar zoom entre outras limitacoes de navegacao
const option = {
    dragging: false,
    touchZoom: false,
    doubleClick: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// pegando os dados do span que armazenam dados trazidos do banco de dados
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

// instanciando o mapa da biblioteca
// cria um objeto L da biblioteca Leaflet
// ([latitude, longitude], zoom)
const map = L.map('mapid', option).setView([lat,lng], 10);

// criacao do titulo e camda de titulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// criacao do icone e popup
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [50, 60],
    iconAnchor: [29, 68],
    popupAnchor: [195, 2]
})

// [latitude, longitude]
L.marker([lat, lng], {icon}).addTo(map)

/* galeria */
function selectImage (event) {
    const button = event.currentTarget;

    // remove todas as classes active
    const buttons = document.querySelectorAll(".images button");
    // uso  de arrow function
    // percorre a node list de button
    // cada botao possui uma classlist, remove a classe com o nome passado no parametro
    // nesse caso remove .active, de modo que tira a selecao do botao
    buttons.forEach((button)=>{
        button.classList.remove("active");
    })

    // selecionando a imagem clicada
    // nesse caso os buttons tem um filho na posicao 0 que é a imagem
    const image = button.children[0];
    // pega o container da imagem, nesse caso a img do nivel mais acima
    const imageContainer = document.querySelector(".orphanage-details > img");
    
    // atualizando o container de imagem com a imagem do botao clicado
    // essa troca é feita com o atributo src
    imageContainer.src = image.src;
    // como button é o currentTarget, ou seja o botao que esta sendo acionado, remove o active do anterior e coloca como classe do botao atual
    // adiciona a class .active ao botao clicado
  
    ////////////////////// consertar pois nao esta pegando o active///////////////////
    button.classlist.add("active");
}