"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSuplemento = void 0;
const express_1 = __importDefault(require("express"));
const controllerSuplemento_js_1 = require("../../../controllers/categorias/ControllerSuplemento/controllerSuplemento.js");
exports.routerSuplemento = express_1.default.Router();
exports.routerSuplemento
    .get("/listar-suplementos", controllerSuplemento_js_1.suplementoController.listarsuplementos)
    .get("/listar-suplemento/:id", controllerSuplemento_js_1.suplementoController.listarsuplementoId)
    .post("/cadastrar-suplemento", controllerSuplemento_js_1.suplementoController.cadastrarsuplemento)
    .put("/atualizar-suplemento/:id", controllerSuplemento_js_1.suplementoController.atualizarsuplemento)
    .delete("/deletar-suplemento-e-imagem/:id", controllerSuplemento_js_1.suplementoController.excluirsuplementoEimagem)
    .delete("/deletar-suplemento/:id", controllerSuplemento_js_1.suplementoController.excluirsuplemento);
