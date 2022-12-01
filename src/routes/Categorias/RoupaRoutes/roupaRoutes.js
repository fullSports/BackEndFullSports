"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerRoupas_js_1 = __importDefault(require("../../../controllers/categorias/ControllerRoupas/controllerRoupas.js"));
const routerRoupa = express_1.default.Router();
routerRoupa
    .get("/listar-roupas", controllerRoupas_js_1.default.listarRoupas)
    .get("/listar-roupa/:id", controllerRoupas_js_1.default.listarRoupaId)
    .post("/cadastrar-roupa", controllerRoupas_js_1.default.cadastrarRoupa)
    .put("/atualizar-roupa/:id", controllerRoupas_js_1.default.atualizarRoupa)
    .delete("/deletar-roupa-e-imagem/:id", controllerRoupas_js_1.default.excluirRoupaEimagem)
    .delete("/deletar-roupa/:id", controllerRoupas_js_1.default.excluirRoupa);
exports.default = routerRoupa;
