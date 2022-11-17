const express = require("express");
const pedidoController = require("./../controllers/pedidoController.js")
const routerPedido = express.Router();
routerPedido
.post("/novo-pedido", pedidoController)
.get("/listar-pedidos",pedidoController.ListarPedido)
module.exports = routerPedido