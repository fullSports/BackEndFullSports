const express = require("express");
const pedidoController = require("./../controllers/pedidoController.js")
const routerPedido = express.Router();
routerPedido
.post("/realizar-pedido", pedidoController.RealizarPedido)
.get("/listar-pedidos",pedidoController.ListarPedido)
module.exports = routerPedido