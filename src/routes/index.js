import express from 'express';
import routerCliente from './clienteRoutes.js';

const routes = (app)=>{
    app.route('/').get((req,res)=>{
        res.status(200).json({"status": "iniciado"})
    })
    app.use(
        express.json(),
        routerCliente
    )
}
export default routes