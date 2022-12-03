"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeFornecedor = void 0;
const express_1 = __importDefault(require("express"));
const fornecedorCotroller_1 = require("../../controllers/FornecedorController/fornecedorCotroller");
exports.routeFornecedor = express_1.default.Router();
exports.routeFornecedor
    .get("/listar-fornecedores", fornecedorCotroller_1.fornecedorController.listarFornecedor)
    .get("/listar-fornecedor/:id", fornecedorCotroller_1.fornecedorController.listarFornecedorId)
    .post("/cadastrar-fornecedor", fornecedorCotroller_1.fornecedorController.cadastrarFornecedor)
    .put("/atualizar-fornecedor/:id", fornecedorCotroller_1.fornecedorController.atualizarfornecedor)
    .delete("/deletar-fornecedor/:id", fornecedorCotroller_1.fornecedorController.excluirFornecedor);
