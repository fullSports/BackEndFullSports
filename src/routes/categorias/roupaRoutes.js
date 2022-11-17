const express = require ("express");
const roupaController = require ("../../controllers/categorias/controllerRoupas.js");
const routerRoupa = express.Router();

routerRoupa
    .get("/listar-roupas", roupaController.listarRoupas)
    .get("/listar-roupa/:id", roupaController.listarRoupaId)
    .post("/cadastrar-roupa", roupaController.cadastrarRoupa)
    .put("/atualizar-roupa/:id", roupaController.atualizarRoupa)
    .delete("/deletar-roupa-e-imagem/:id",roupaController.excluirRoupaEimagem)
    .delete("/deletar-roupa/:id",roupaController.excluirRoupa)
module.exports = routerRoupa;