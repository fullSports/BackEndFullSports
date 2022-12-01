"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pedidoSchema = new mongoose_1.default.Schema({
    quantidadePedido: {
        type: Number,
        required: true,
        min: [1, 'Quantidade nao pode ser inferior a 1']
    },
    produto: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'produtos',
        required: true,
    },
    cliente: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'clientes',
        required: true,
    },
    total: {
        type: Number
    }
});
// const carrinhoSchema = new mongoose.Schema({
//     items: [pedidoSchema],
//     subTotal: {
//         default: 0,
//         type: Number
//     }
// }, {
// })
const carrinho = mongoose_1.default.model("pedido", pedidoSchema);
exports.default = carrinho;
