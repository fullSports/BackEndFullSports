import express, { Response, Request}  from 'express';
import  routerCalcado  from './Categorias/CalcadosRoutes/calcadoRoutes';
import  routerEquipamento  from './Categorias/EquipamentoRoutes/equipamentoRoutes';
import  routerRoupa  from './Categorias/RoupaRoutes/roupaRoutes';
import  routerSuplemento  from './Categorias/SuplementoRoutes/suplementoRoutes';
import  routerCliente  from './ClienteRoutes/clienteRoutes'
import  routeFornecedor  from './FornecedorRoutes/fornecedorRoutes';
const routerImagem = require('./imagem.route.js')
import  routerlogin  from './LoginRoutes/loginRoutes';
import  routerPedido  from './PedidoRoutes/pedidoRoutes';
import routeProduto from './ProdutoRoutes/produtoRoutes';
import db from "../config/dbConnect/dbConnect";
import logger from "../logger/index"
export const Routes = (app = express()) => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).json({ "status": "iniciado" })
    })
    app.route('/teste').get((req: Request, res: Response) => {
        res.status(200).json({ "status": "teste" })
    })
    db.on("error", logger.error.bind(console, "erro na conexão com o banco de dados! "))
    db.once("open", () => {
        logger.info("conexão com banco bem-sucedida!")
    })
    app.use(
        express.json(),
        routerCliente,
        routerImagem,
        routeProduto,
        routeFornecedor,
        routerRoupa,
        routerEquipamento,
        routerSuplemento,
        routerlogin,
        routerCalcado,
        routerPedido
    )
}