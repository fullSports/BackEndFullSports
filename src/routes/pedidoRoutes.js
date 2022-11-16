const express = require("express");
const pedidoController = require("./../controllers/pedidoController.js")
const routerPedido = express.Router();
routerPedido
.post("/carrinho", pedidoController.addItemCarrinho)
.get("/carrinho", pedidoController.getcarrinho)
.delete("/carrinho-vazio", pedidoController.emptycarrinho)
module.exports = routerPedido