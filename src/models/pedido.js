const mongoose = require('mongoose');
const pedidoSchema = new mongoose.Schema(
    {
    quantidadePedido: {
        type: Number,
        required: true,
        min: [1, 'Quantidade nao pode ser inferior a 1']
    },
    produto:{
        type: mongoose.Schema.Types.ObjectId, ref: 'produtos',
        required: true,
    },
    total: {
        type: Number
    }
    }
)
// const carrinhoSchema = new mongoose.Schema({
//     items: [pedidoSchema],
//     subTotal: {
//         default: 0,
//         type: Number
//     }
// }, {
// })
const carrinho = mongoose.model("pedido", pedidoSchema);
module.exports = carrinho;