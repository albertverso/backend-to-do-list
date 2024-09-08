//iniciar um servidor Express (ou qualquer outra lógica do seu app)
const express = require('express');
const {cors, bodyParser } = require('../middleware/middlewareApp')
const verificando = require('../controllers/appController')
const app = express();  

app.use(bodyParser.json()); // middleware para parsear o body da requisição
app.use(cors())  // middleware para permitir requisições de outros domínios

app.get('/', verificando);

module.exports = app