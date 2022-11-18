const express = require('express');
const routerCalcado = require('./categorias/calcadoRoutes.js');
const routerequipamento = require('./categorias/equipamentoRoutes.js');
const routerRoupa = require('./categorias/roupaRoutes.js');
const routersuplemento = require('./categorias/suplementoRoutes.js');
const routerCliente = require('./clienteRoutes.js');
const routeFornecedor = require('./fornecedorRoutes.js');
const routerImagem = require('./imagemRoutes.js');
const routerlogin = require('./loginRoutes.js');
const routerPedido = require('./pedidoRoutes.js');
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
        routeFornecedor,
        routerRoupa,
        routerequipamento,
        routersuplemento,
        routerlogin,
        routerCalcado,
        routerPedido
    )
}
module.exports = routes