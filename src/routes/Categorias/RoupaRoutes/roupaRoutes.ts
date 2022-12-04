import express from "express";
import {roupaController} from "../../../controllers/categorias/ControllerRoupas/controllerRoupas";
export const routerRoupa = express.Router();

routerRoupa
    .get("/listar-roupas", roupaController.listarRoupas)
    .get("/listar-roupa/:id", roupaController.listarRoupaId)
    .post("/cadastrar-roupa", roupaController.cadastrarRoupa)
    .put("/atualizar-roupa/:id", roupaController.atualizarRoupa)
    .delete("/deletar-roupa-e-imagem/:id",roupaController.excluirRoupaEimagem)
    .delete("/deletar-roupa/:id",roupaController.excluirRoupa)