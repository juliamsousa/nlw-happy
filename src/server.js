// hbs é uma template engine para handlebars

// importacao do express
const express  = require ('express');
// path é uma funcionalidade do node
// concatena os caminhos de acordo com o sistema operacional
const path = require('path');
// iniciando o express
const server = express();
// importando o js de paginas
const pages = require('./pages.js');

server

// utilizar body do req
.use(express.urlencoded({extended: true}))

// utilizando arquivos estaticos
.use(express.static('public'))

// configurar template engine 
// com isso, todos os arquivos devem ser terminar com hbs
.set('views', path.join(__dirname, "views"))
.set('view engine','hbs')

// rotas da aplicacao
// nessas rotas são feitas as renderizacoes das paginas
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.post('/save-orphanage', pages.saveOrphanage)

// ligar o servidor
server.listen(5500);