"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerlogin = void 0;
const express_1 = __importDefault(require("express"));
const loginControoller_1 = require("../../controllers/LoginController/loginControoller");
exports.routerlogin = express_1.default.Router();
exports.routerlogin
    .post("/login", loginControoller_1.loginController.cadastrarLogin)
    .get("/login", loginControoller_1.loginController.listarLogin)
    .get("/login/:id", loginControoller_1.loginController.listarLoginID)
    .put("/login/:id", loginControoller_1.loginController.atualizarLogin)
    .delete("/login/:id", loginControoller_1.loginController.excluirLogin)
    .post("/realizar-login", loginControoller_1.loginController.realizarLogin)
    .post("/pesquisar-email", loginControoller_1.loginController.pesquisarEmail)
    .post("/pesquisar-email-cliente", loginControoller_1.loginController.pesquisarEmail_RetornarCliente);
