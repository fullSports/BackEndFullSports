import express from "express";
import {pedidoController} from "../../controllers/PedidoController/pedidoController.js";
export const routerPedido = express.Router();
routerPedido
.post("/realizar-pedido", pedidoController.RealizarPedido)
.get("/listar-pedidos",pedidoController.ListarPedido)
.get("/listar-pedido/:id",pedidoController.ListaPedidoId)
.delete("/deletar-pedido/:id",pedidoController.CancelarPedido)
