import express from "express";
import equipamentoController from "../../../controllers/categorias/ControllerEquipamento/controllerEquipamento.js";
const routerequipamento = express.Router();

routerequipamento
    .get("/listar-equipamentos", equipamentoController.listarequipamento)
    .get("/listar-equipamento/:id", equipamentoController.listarequipamentoId)
    .post("/cadastrar-equipamento", equipamentoController.cadastrarequipamento)
    .put("/atualizar-equipamento/:id", equipamentoController.atualizarequipamento)
    .delete("/deletar-equipamento-e-imagem/:id",equipamentoController.excluirEquipamentoEimagem)
    .delete("/deletar-equipamento/:id",equipamentoController.excluirEquipamento)
export default routerequipamento;