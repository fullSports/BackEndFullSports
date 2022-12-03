"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEquipamento = void 0;
const express_1 = __importDefault(require("express"));
const controllerEquipamento_js_1 = require("../../../controllers/categorias/ControllerEquipamento/controllerEquipamento.js");
exports.routerEquipamento = express_1.default.Router();
exports.routerEquipamento
    .get("/listar-equipamentos", controllerEquipamento_js_1.equipamentoController.listarequipamento)
    .get("/listar-equipamento/:id", controllerEquipamento_js_1.equipamentoController.listarequipamentoId)
    .post("/cadastrar-equipamento", controllerEquipamento_js_1.equipamentoController.cadastrarequipamento)
    .put("/atualizar-equipamento/:id", controllerEquipamento_js_1.equipamentoController.atualizarequipamento)
    .delete("/deletar-equipamento-e-imagem/:id", controllerEquipamento_js_1.equipamentoController.excluirEquipamentoEimagem)
    .delete("/deletar-equipamento/:id", controllerEquipamento_js_1.equipamentoController.excluirEquipamento);
