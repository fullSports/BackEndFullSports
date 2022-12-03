"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeProduto = void 0;
const express_1 = __importDefault(require("express"));
const produtoController_1 = require("../../controllers/ProdutoController/produtoController");
exports.routeProduto = express_1.default.Router();
exports.routeProduto
    .get("/listar-produtos", produtoController_1.produtoController.listarProdutos)
    .get("/listar-produto/:id", produtoController_1.produtoController.listarProdutoId)
    .post("/cadastrar-produto", produtoController_1.produtoController.cadastrarProduto)
    .put("/atualizar-produto/:id", produtoController_1.produtoController.atualizarProduto)
    .delete("/deletar-produto/:id", produtoController_1.produtoController.excluirProduto);
