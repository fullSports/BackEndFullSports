const express = require ("express");
const clienteController = require ("../controllers/clienteController.js");
const routerCliente = express.Router();

routerCliente
    .get("/listar-clientes", clienteController.listarClientes)
    .get("/listar-cliente/:id", clienteController.listarClienteId)
    .post("/cadastrar-cliente", clienteController.cadastrarCliente)
    .post("/login-cliente", clienteController.loginCliente)
    .put("/atualizar-cliente/:id", clienteController.atualizarCliente)
    .delete("/deletar-cliente/:id",clienteController.excluirCliente)
module.exports = routerCliente    ;