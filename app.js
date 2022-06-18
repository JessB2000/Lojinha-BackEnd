const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const rotaProdutos = require('./controller/protudosc');
const cors = require('cors');
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Acess-Controll-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

app.use('/produtos', rotaProdutos);

//rota usada para quando não encontra nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});
module.exports = app;