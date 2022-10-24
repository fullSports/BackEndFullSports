const express = require('express');
const routerCliente = require('./clienteRoutes.js');

const routes = (app)=>{
    app.route('/').get((req,res)=>{
        res.status(200).json({"status": "iniciado"})
    })
    app.use(
        express.json(),
        routerCliente
    )
}
module.exports = routes