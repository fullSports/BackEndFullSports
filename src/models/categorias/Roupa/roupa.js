"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roupa = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roupaSchema = new mongoose_1.default.Schema({
    id: {
        type: String
    },
    nome: {
        type: String,
        required: true
    },
    fornecedor: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'fornecedores',
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    tamanho: {
        type: Number,
        required: true
    },
    preco: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        min: [1, 'Quantidade nao pode ser inferior a 1'],
        required: true
    },
    imagemProduto: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'imagem', index: true, default: [], required: true }
    ]
});
exports.roupa = mongoose_1.default.model("roupas", roupaSchema);
