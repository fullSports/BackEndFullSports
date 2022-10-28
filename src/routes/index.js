const express = require('express');
const routerCliente = require('./clienteRoutes.js');
const routeFornecedor = require('./fornecedorRoutes.js');
const routerImagem = require('./imagemRoutes.js');
const routeProduto = require('./produtoRoutes.js');
const routes = (app)=>{
    app.route('/').get((req,res)=>{
        res.status(200).json({"status": "iniciado"})
    })
    app.use(
        express.json(),
        routerCliente,
        routerImagem,
        routeProduto,
        routeFornecedor
    )
}
module.exports = routes