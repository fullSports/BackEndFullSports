import express from "express";
import clienteController from "../controllers/clienteController.js";
const routerCliente = express.Router()
routerCliente
    .get("/listar-clientes", clienteController.listarClientes)

export default routerCliente    