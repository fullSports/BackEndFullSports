const express = require ("express");
const produtoController = require ("./../controllers/produtoController.js");
const routeProduto = express.Router();
routeProduto
    .get("/listar-produtos", produtoController.listarProdutos)
    .get("/listar-produto/:id", produtoController.listarProdutoId)
    .post("/cadastrar-produto", produtoController.cadastrarProduto)
    .put("/atualizar-produto/:id", produtoController.atualizarProduto)
    .delete("/deletar-produtos/:id", produtoController.excluirProduto)
module.exports = routeProduto    