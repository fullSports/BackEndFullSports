"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calcadoRoutes_1 = __importDefault(require("./Categorias/CalcadosRoutes/calcadoRoutes"));
const equipamentoRoutes_1 = __importDefault(require("./Categorias/EquipamentoRoutes/equipamentoRoutes"));
const roupaRoutes_1 = __importDefault(require("./Categorias/RoupaRoutes/roupaRoutes"));
const suplementoRoutes_1 = __importDefault(require("./Categorias/SuplementoRoutes/suplementoRoutes"));
const clienteRoutes_1 = __importDefault(require("./ClienteRoutes/clienteRoutes"));
const fornecedorRoutes_1 = __importDefault(require("./FornecedorRoutes/fornecedorRoutes"));
const routerImagem = require('./ImagemRoutes/imagemRoutes.js');
const loginRoutes_1 = __importDefault(require("./LoginRoutes/loginRoutes"));
const pedidoRoutes_1 = __importDefault(require("./PedidoRoutes/pedidoRoutes"));
const produtoRoutes_1 = __importDefault(require("./ProdutoRoutes/produtoRoutes"));
const Routes = (app = (0, express_1.default)()) => {
    app.route('/').get((req, res) => {
        res.status(200).json({ "status": "iniciado" });
    });
    return app.use(express_1.default.json(), clienteRoutes_1.default, routerImagem, produtoRoutes_1.default, fornecedorRoutes_1.default, roupaRoutes_1.default, equipamentoRoutes_1.default, suplementoRoutes_1.default, loginRoutes_1.default, calcadoRoutes_1.default, pedidoRoutes_1.default);
};
exports.default = Routes;
