const express = require ("express");
const suplementoController = require ("../../controllers/categorias/controllerSuplemento.js");
const routersuplemento = express.Router();

routersuplemento
    .get("/listar-suplementos", suplementoController.listarsuplementos)
    .get("/listar-suplemento/:id", suplementoController.listarsuplementoId)
    .post("/cadastrar-suplemento", suplementoController.cadastrarsuplemento)
    .put("/atualizar-suplemento/:id", suplementoController.atualizarsuplemento)
    .delete("/deletar-suplemento/:id",suplementoController.excluirsuplemento)
module.exports = routersuplemento;