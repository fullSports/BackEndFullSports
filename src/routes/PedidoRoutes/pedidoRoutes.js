"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoController_js_1 = __importDefault(require("../../controllers/PedidoController/pedidoController.js"));
const routerPedido = express_1.default.Router();
routerPedido
    .post("/realizar-pedido", pedidoController_js_1.default.RealizarPedido)
    .get("/listar-pedidos", pedidoController_js_1.default.ListarPedido)
    .get("/listar-pedido/:id", pedidoController_js_1.default.ListaPedidoId)
    .delete("/deletar-pedido/:id", pedidoController_js_1.default.CancelarPedido);
exports.default = routerPedido;
