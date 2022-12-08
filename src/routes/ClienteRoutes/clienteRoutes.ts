import express from "express";
import  clienteController  from "../../controllers/ClienteController/clienteController";
const routerCliente = express.Router();

routerCliente
    .get("/listar-clientes", clienteController.listarClientes)
    .get("/listar-cliente/:id", clienteController.listarClienteId)
    .post("/cadastrar-cliente", clienteController.cadastrarCliente)
    .put("/atualizar-cliente/:id", clienteController.atualizarCliente)
    .delete("/deletar-cliente/:id", clienteController.excluirCliente)
export default routerCliente;
