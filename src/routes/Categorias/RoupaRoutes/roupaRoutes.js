"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRoupa = void 0;
const express_1 = __importDefault(require("express"));
const controllerRoupas_js_1 = require("../../../controllers/categorias/ControllerRoupas/controllerRoupas.js");
exports.routerRoupa = express_1.default.Router();
exports.routerRoupa
    .get("/listar-roupas", controllerRoupas_js_1.roupaController.listarRoupas)
    .get("/listar-roupa/:id", controllerRoupas_js_1.roupaController.listarRoupaId)
    .post("/cadastrar-roupa", controllerRoupas_js_1.roupaController.cadastrarRoupa)
    .put("/atualizar-roupa/:id", controllerRoupas_js_1.roupaController.atualizarRoupa)
    .delete("/deletar-roupa-e-imagem/:id", controllerRoupas_js_1.roupaController.excluirRoupaEimagem)
    .delete("/deletar-roupa/:id", controllerRoupas_js_1.roupaController.excluirRoupa);
