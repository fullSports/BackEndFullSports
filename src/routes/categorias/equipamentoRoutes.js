const express = require ("express");
const equipamentoController = require ("../../controllers/categorias/controllerEquipamento.js");
const routerequipamento = express.Router();

routerequipamento
    .get("/listar-equipamentos", equipamentoController.listarequipamento)
    .get("/listar-equipamento/:id", equipamentoController.listarequipamentoId)
    .post("/cadastrar-equipamento", equipamentoController.cadastrarequipamento)
    .put("/atualizar-equipamento/:id", equipamentoController.atualizarequipamento)
    .delete("/deletar-equipamento/:id",equipamentoController.excluirequipamento)
module.exports = routerequipamento;