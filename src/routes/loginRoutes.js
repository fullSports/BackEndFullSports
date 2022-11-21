const express = require("express");
const loginController = require("./../controllers/loginControoller.js")
const routerlogin = express.Router();

routerlogin
    .post("/login", loginController.cadastrarLogin)
    .get("/login",loginController.listarLogin)
    .get("/login/:id",loginController.listarLoginID)
    .put("/login/:id",loginController.atualizarLogin)
    .delete("/login/:id",loginController.excluirLogin)
    .post("/realizar-login",loginController.realizarLogin)
    .post("/pesquisar-email", loginController.pesquisarEmail)
module.exports = routerlogin;