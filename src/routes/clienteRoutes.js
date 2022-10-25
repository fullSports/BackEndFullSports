const express = require ("express");
const clienteController = require ("../controllers/clienteController.js");
const routerCliente = express.Router();
const multer = require('multer')
const multerConfig = require('./../config/multer.js');
const Cliente = require('./../models/cliente.js')
routerCliente
    .get("/listar-clientes", clienteController.listarClientes)
    .get("/listar-cliente/:id", clienteController.listarClienteId)
    .post("/cadastrar-cliente",multer(multerConfig).single("file"),clienteController.cadastrarCliente)
    .put("/atualizar-cliente/:id", clienteController.atualizarCliente)
    .delete("/deletar-cliente/:id",clienteController.excluirCliente)
module.exports = routerCliente    ;