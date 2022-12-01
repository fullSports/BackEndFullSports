"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_js_1 = __importDefault(require("../../controllers/ClienteController/clienteController.js"));
const routerCliente = express_1.default.Router();
routerCliente
    .get("/listar-clientes", clienteController_js_1.default.listarClientes)
    .get("/listar-cliente/:id", clienteController_js_1.default.listarClienteId)
    .post("/cadastrar-cliente", clienteController_js_1.default.cadastrarCliente)
    .put("/atualizar-cliente/:id", clienteController_js_1.default.atualizarCliente)
    .delete("/deletar-cliente/:id", clienteController_js_1.default.excluirCliente);
exports.default = routerCliente;
