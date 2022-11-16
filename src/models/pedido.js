const mongoose = require('mongoose');
const pedidoSchema = new mongoose.Schema(
    {
    id: {
        type: String
    },
    quantidade: {
        type: Number,
        required: true,
        min: [1, 'Quantidade nao pode ser inferior a 1']
    },
    preco: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
},{
})
const carrinhoSchema = new mongoose.Schema({
    items: [pedidoSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
})
const carrinho = mongoose.model("pedido", carrinhoSchema);
module.exports = carrinho;