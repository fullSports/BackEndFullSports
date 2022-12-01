"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerEquipamento_js_1 = __importDefault(require("../../../controllers/categorias/ControllerEquipamento/controllerEquipamento.js"));
const routerequipamento = express_1.default.Router();
routerequipamento
    .get("/listar-equipamentos", controllerEquipamento_js_1.default.listarequipamento)
    .get("/listar-equipamento/:id", controllerEquipamento_js_1.default.listarequipamentoId)
    .post("/cadastrar-equipamento", controllerEquipamento_js_1.default.cadastrarequipamento)
    .put("/atualizar-equipamento/:id", controllerEquipamento_js_1.default.atualizarequipamento)
    .delete("/deletar-equipamento-e-imagem/:id", controllerEquipamento_js_1.default.excluirEquipamentoEimagem)
    .delete("/deletar-equipamento/:id", controllerEquipamento_js_1.default.excluirEquipamento);
exports.default = routerequipamento;
