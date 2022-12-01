"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerCacados_1 = __importDefault(require("../../../controllers/categorias/ControllerCacados/controllerCacados"));
const routerCalcado = express_1.default.Router();
routerCalcado
    .get("/listar-calcados", controllerCacados_1.default.listarcalcado)
    .get("/listar-calcado/:id", controllerCacados_1.default.listarcalcadoId)
    .post("/cadastrar-calcado", controllerCacados_1.default.cadastrarcalcado)
    .put("/atualizar-calcado/:id", controllerCacados_1.default.atualizarcalcado)
    .delete("/deletar-calcado-e-imagem/:id", controllerCacados_1.default.excluirCalcadoEimagem)
    .delete("/deletar-calcado/:id", controllerCacados_1.default.ExcluirCalcado);
exports.default = routerCalcado;
