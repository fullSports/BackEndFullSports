const express = require ("express");
const calcadoController = require ("../../controllers/categorias/controllerCacados.js");
const routerCalcado = express.Router();

routerCalcado
    .get("/listar-calcados", calcadoController.listarcalcado)
    .get("/listar-calcado/:id", calcadoController.listarcalcadoId)
    .post("/cadastrar-calcado", calcadoController.cadastrarcalcado)
    .put("/atualizar-calcado/:id", calcadoController.atualizarcalcado)
    .delete("/deletar-calcado-e-imagem/:id",calcadoController.excluirCalcadoEimagem)
    .delete("/deletar-calcado/:id",calcadoController.ExcluirCalcado)
module.exports = routerCalcado;