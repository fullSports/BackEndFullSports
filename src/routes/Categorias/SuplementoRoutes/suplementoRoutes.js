"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerSuplemento_js_1 = __importDefault(require("../../../controllers/categorias/ControllerSuplemento/controllerSuplemento.js"));
const routerSuplemento = express_1.default.Router();
routerSuplemento
    .get("/listar-suplementos", controllerSuplemento_js_1.default.listarsuplementos)
    .get("/listar-suplemento/:id", controllerSuplemento_js_1.default.listarsuplementoId)
    .post("/cadastrar-suplemento", controllerSuplemento_js_1.default.cadastrarsuplemento)
    .put("/atualizar-suplemento/:id", controllerSuplemento_js_1.default.atualizarsuplemento)
    .delete("/deletar-suplemento-e-imagem/:id", controllerSuplemento_js_1.default.excluirsuplementoEimagem)
    .delete("/deletar-suplemento/:id", controllerSuplemento_js_1.default.excluirsuplemento);
exports.default = routerSuplemento;
