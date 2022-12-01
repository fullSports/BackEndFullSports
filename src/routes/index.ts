import express,{Response,Request} from 'express';
import routerCalcado from './Categorias/CalcadosRoutes/calcadoRoutes';
import routerEquipamento from './Categorias/EquipamentoRoutes/equipamentoRoutes';
import routerRoupa from './Categorias/RoupaRoutes/roupaRoutes';
import routerSuplemento from './Categorias/SuplementoRoutes/suplementoRoutes';
import routerCliente from './ClienteRoutes/clienteRoutes'
import routeFornecedor from './FornecedorRoutes/fornecedorRoutes';
const routerImagem = require('./ImagemRoutes/imagemRoutes.js')
import routerlogin from './LoginRoutes/loginRoutes';
import routerPedido from './PedidoRoutes/pedidoRoutes';
import routeProduto from './ProdutoRoutes/produtoRoutes';
const Routes = (app = express())=>{
    app.route('/').get((req:Request,res:Response)=>{
        res.status(200).json({"status": "iniciado"})
    })
    return app.use(
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
export default Routes;