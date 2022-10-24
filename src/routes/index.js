const express = require('express');
const routerCliente = require('./clienteRoutes.js');
const routerImagem = require('./imagemRoutes.js');
require('dotenv').config()
const routes = (app)=>{
    app.route('/').get((req,res)=>{
        res.status(200).json({"status": "iniciado"})
    })
    app.use(
        express.json(),
        routerCliente,
        routerImagem
    )
}
module.exports = routes