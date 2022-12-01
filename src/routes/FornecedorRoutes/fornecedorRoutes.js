"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fornecedorCotroller_1 = __importDefault(require("../../controllers/FornecedorController/fornecedorCotroller"));
const routeFornecedor = express_1.default.Router();
routeFornecedor
    .get("/listar-fornecedores", fornecedorCotroller_1.default.listarFornecedor)
    .get("/listar-fornecedor/:id", fornecedorCotroller_1.default.listarFornecedorId)
    .post("/cadastrar-fornecedor", fornecedorCotroller_1.default.cadastrarFornecedor)
    .put("/atualizar-fornecedor/:id", fornecedorCotroller_1.default.atualizarfornecedor)
    .delete("/deletar-fornecedor/:id", fornecedorCotroller_1.default.excluirFornecedor);
exports.default = routeFornecedor;
