const express = require ("express");
const fornecedorController = require("./../controllers/fornecedorCotroller.js");
const routeFornecedor = express.Router();
routeFornecedor
    .get("/listar-fornecedores", fornecedorController.listarFornecedor)
    .get("/listar-fornecedor/:id", fornecedorController.listarFornecedorId)
    .post("/cadastrar-fornecedor", fornecedorController.cadastrarFornecedor)
    .put("/atualizar-fornecedor/:id", fornecedorController.atualizarfornecedor)
    .delete("/deletar-fornecedor/:id", fornecedorController.excluirFornecedor)
    module.exports = routeFornecedor