"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginControoller_1 = __importDefault(require("../../controllers/LoginController/loginControoller"));
const routerlogin = express_1.default.Router();
routerlogin
    .post("/login", loginControoller_1.default.cadastrarLogin)
    .get("/login", loginControoller_1.default.listarLogin)
    .get("/login/:id", loginControoller_1.default.listarLoginID)
    .put("/login/:id", loginControoller_1.default.atualizarLogin)
    .delete("/login/:id", loginControoller_1.default.excluirLogin)
    .post("/realizar-login", loginControoller_1.default.realizarLogin)
    .post("/pesquisar-email", loginControoller_1.default.pesquisarEmail)
    .post("/pesquisar-email-cliente", loginControoller_1.default.pesquisarEmail_RetornarCliente);
exports.default = routerlogin;
