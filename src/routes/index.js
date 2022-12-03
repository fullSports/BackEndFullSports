"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const calcadoRoutes_1 = require("./Categorias/CalcadosRoutes/calcadoRoutes");
const equipamentoRoutes_1 = require("./Categorias/EquipamentoRoutes/equipamentoRoutes");
const roupaRoutes_1 = require("./Categorias/RoupaRoutes/roupaRoutes");
const suplementoRoutes_1 = require("./Categorias/SuplementoRoutes/suplementoRoutes");
const clienteRoutes_1 = require("./ClienteRoutes/clienteRoutes");
const fornecedorRoutes_1 = require("./FornecedorRoutes/fornecedorRoutes");
const routerImagem = require('./imagemRoutes.js');
const loginRoutes_1 = require("./LoginRoutes/loginRoutes");
const pedidoRoutes_1 = require("./PedidoRoutes/pedidoRoutes");
const produtoRoutes_1 = require("./ProdutoRoutes/produtoRoutes");
const Routes = (app = (0, express_1.default)()) => {
    app.route('/').get((req, res) => {
        res.status(200).json({ "status": "iniciado" });
    });
    return app.use(express_1.default.json(), clienteRoutes_1.routerCliente, routerImagem, produtoRoutes_1.routeProduto, fornecedorRoutes_1.routeFornecedor, roupaRoutes_1.routerRoupa, equipamentoRoutes_1.routerEquipamento, suplementoRoutes_1.routerSuplemento, loginRoutes_1.routerlogin, calcadoRoutes_1.routerCalcado, pedidoRoutes_1.routerPedido);
};
exports.Routes = Routes;
