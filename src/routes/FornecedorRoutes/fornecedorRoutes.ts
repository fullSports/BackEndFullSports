import express from "express";
import fornecedorController  from "../../controllers/FornecedorController/fornecedorCotroller"
const routeFornecedor = express.Router();
routeFornecedor
    .get("/listar-fornecedores", fornecedorController.listarFornecedor)
    .get("/listar-fornecedor/:id", fornecedorController.listarFornecedorId)
    .post("/cadastrar-fornecedor", fornecedorController.cadastrarFornecedor)
    .put("/atualizar-fornecedor/:id", fornecedorController.atualizarfornecedor)
    .delete("/deletar-fornecedor/:id", fornecedorController.excluirFornecedor)
export default routeFornecedor;