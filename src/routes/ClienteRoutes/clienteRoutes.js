"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCliente = void 0;
const express_1 = __importDefault(require("express"));
const clienteController_js_1 = require("../../controllers/ClienteController/clienteController.js");
exports.routerCliente = express_1.default.Router();
exports.routerCliente
    .get("/listar-clientes", clienteController_js_1.clienteController.listarClientes)
    .get("/listar-cliente/:id", clienteController_js_1.clienteController.listarClienteId)
    .post("/cadastrar-cliente", clienteController_js_1.clienteController.cadastrarCliente)
    .put("/atualizar-cliente/:id", clienteController_js_1.clienteController.atualizarCliente)
    .delete("/deletar-cliente/:id", clienteController_js_1.clienteController.excluirCliente);
