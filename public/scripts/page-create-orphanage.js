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
})

// o let permite que a variavel seja alterada em algum momento
// a variavel é inicializada vazia e depois é modificada 
let marker;

// create and add marker
// no clique dentro do mapa chamará a funcao arrow com o evento como paramtro
// devemos ter uma localizacao unica para o orfanato
// a funcao verifica se existe um marker e o remove colocando um nov
map.on('click', (event)=> {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;

    // seletor de atributo pelo nome 
    document.querySelector('[name=latitude]').value = latitude;
    document.querySelector('[name=longitude]').value = longitude;


    // a variavel let é inicializada como vazia
    // se ela nao estiver preenchida o && retorna falso e passa para a proxima linha
    marker&&map.removeLayer(marker);

    // add icon tileLayer
    // adicion um ícone ao marcador
    marker = L.marker([latitude, longitude], {icon}).addTo(map);
})

// upload de fotos, adiciona um campo de fotos
// a cada link adicionado um novo campo surge

function addPhotoField () {
    // pega o container de fotos
    const container = document.querySelector('#images');

    // pega o container para duplicar new image
    // pega todas as imagens
    const fieldsContainer = document.querySelectorAll('.new-upload');

    // realizar o clone da ultima imagem adicionada
    // cloneNode copia um nó, caso receba true como parametro clona o nó com seus filhos
    // o fieldContainer recebe uma div que tem como fihlos uma input e um span
    const newFieldContainer = fieldsContainer[fieldsContainer.length-1].cloneNode(true);
    
    // armazena o valor da input em uma variavel
    // newFieldContainer é uma html Collectin que contem o input e span, seu filho [0] corresponda à input 
    const input = newFieldContainer.children[0].value;

    // vefica se a input esta vazia
    if(input=== "")
        return;

    // limpa o conteudo do campo antes de aciciona-lo
    newFieldContainer.children[0].value="";
        
    //coloca o campo clonado dentro do container
    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer);
}

function deleteField (event)
{
    // retorna quem esta disparando o evento
    const span = event.currentTarget;

    // hmtl Collection composta por input e span
    // querySelectorAll seleciona todos os elementos que contema aquele atributo passado como parametro
    const fieldsContainer = document.querySelectorAll ('.new-upload');

    console.log(fieldsContainer);

    if (fieldsContainer.length<=1)
    {
        // limpa o campo caso seja unico
        span.parentNode.children[0].value = "";
        return;
    }

    // deletar o campo
    // parentNode retorna o nó pai do elemento
    span.parentNode.remove();   
}

// troca da selecao dos botoes sim e nao
function toggleSelect(event) {
    // retira a classe active dos botoes
    // o querySelectorAll seleciona todos os botoes 
    // a funcao forEach percorre todos eles e executa a function
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'));

    // pega o botao que dispara o evento
    // adiciona a classe active no botao clicado
    const button = event.currentTarget;
    button.classList.add('active')

    // atualizar a input hidden com o valor selecionado
    const input = document.querySelector('[name = "open-on-weekends"]');

    // verificar o valor do button
    input.value = button.dataset.value;
}