"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPedido = void 0;
const express_1 = __importDefault(require("express"));
const pedidoController_js_1 = require("../../controllers/PedidoController/pedidoController.js");
exports.routerPedido = express_1.default.Router();
exports.routerPedido
    .post("/realizar-pedido", pedidoController_js_1.pedidoController.RealizarPedido)
    .get("/listar-pedidos", pedidoController_js_1.pedidoController.ListarPedido)
    .get("/listar-pedido/:id", pedidoController_js_1.pedidoController.ListaPedidoId)
    .delete("/deletar-pedido/:id", pedidoController_js_1.pedidoController.CancelarPedido);
