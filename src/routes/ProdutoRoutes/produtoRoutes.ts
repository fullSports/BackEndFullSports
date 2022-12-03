import express  from "express";
import {produtoController}  from "../../controllers/ProdutoController/produtoController";
export const routeProduto = express.Router();
routeProduto
    .get("/listar-produtos", produtoController.listarProdutos)
    .get("/listar-produto/:id", produtoController.listarProdutoId)
    .post("/cadastrar-produto", produtoController.cadastrarProduto)
    .put("/atualizar-produto/:id", produtoController.atualizarProduto)
    .delete("/deletar-produto/:id", produtoController.excluirProduto)