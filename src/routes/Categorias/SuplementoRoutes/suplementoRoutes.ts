import express from "express";
import suplementoController from "../../../controllers/categorias/ControllerSuplemento/controllerSuplemento.js";
const routerSuplemento = express.Router();

routerSuplemento
    .get("/listar-suplementos", suplementoController.listarsuplementos)
    .get("/listar-suplemento/:id", suplementoController.listarsuplementoId)
    .post("/cadastrar-suplemento", suplementoController.cadastrarsuplemento)
    .put("/atualizar-suplemento/:id", suplementoController.atualizarsuplemento)
    .delete("/deletar-suplemento-e-imagem/:id",suplementoController.excluirsuplementoEimagem)
    .delete("/deletar-suplemento/:id",suplementoController.excluirsuplemento)
export default routerSuplemento;