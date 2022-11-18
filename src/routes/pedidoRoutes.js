const express = require("express");
const pedidoController = require("./../controllers/pedidoController.js")
const routerPedido = express.Router();
routerPedido
.post("/realizar-pedido", pedidoController.RealizarPedido)
.get("/listar-pedidos",pedidoController.ListarPedido)
.get("/listar-pedido/:id",pedidoController.ListaPedidoId)
.delete("/deletar-pedido/:id",pedidoController.CancelarPedido)
module.exports = routerPedido