"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produtoController_1 = __importDefault(require("../../controllers/ProdutoController/produtoController"));
const routeProduto = express_1.default.Router();
routeProduto
    .get("/listar-produtos", produtoController_1.default.listarProdutos)
    .get("/listar-produto/:id", produtoController_1.default.listarProdutoId)
    .post("/cadastrar-produto", produtoController_1.default.cadastrarProduto)
    .put("/atualizar-produto/:id", produtoController_1.default.atualizarProduto)
    .delete("/deletar-produto/:id", produtoController_1.default.excluirProduto);
exports.default = routeProduto;
