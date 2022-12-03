import express from "express";
import calcadoController from "../../../controllers/categorias/ControllerCacados/controllerCacados";
const routerCalcado = express.Router();

routerCalcado
    .get("/listar-calcados", calcadoController.listarcalcado)
    .get("/listar-calcado/:id", calcadoController.listarcalcadoId)
    .post("/cadastrar-calcado", calcadoController.cadastrarcalcado)
    .put("/atualizar-calcado/:id", calcadoController.atualizarcalcado)
    .delete("/deletar-calcado-e-imagem/:id",calcadoController.excluirCalcadoEimagem)
    .delete("/deletar-calcado/:id",calcadoController.ExcluirCalcado)
export default routerCalcado;