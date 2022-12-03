"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCalcado = void 0;
const express_1 = __importDefault(require("express"));
const controllerCacados_1 = require("../../../controllers/categorias/ControllerCacados/controllerCacados");
exports.routerCalcado = express_1.default.Router();
exports.routerCalcado
    .get("/listar-calcados", controllerCacados_1.calcadoController.listarcalcado)
    .get("/listar-calcado/:id", controllerCacados_1.calcadoController.listarcalcadoId)
    .post("/cadastrar-calcado", controllerCacados_1.calcadoController.cadastrarcalcado)
    .put("/atualizar-calcado/:id", controllerCacados_1.calcadoController.atualizarcalcado)
    .delete("/deletar-calcado-e-imagem/:id", controllerCacados_1.calcadoController.excluirCalcadoEimagem)
    .delete("/deletar-calcado/:id", controllerCacados_1.calcadoController.ExcluirCalcado);
