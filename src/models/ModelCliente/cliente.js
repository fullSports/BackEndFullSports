"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliente = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clienteSchema = new mongoose_1.default.Schema({
    cpf: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    login: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'login',
        required: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: String,
        required: true
    },
    imagemPerfil: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'imagem'
    },
});
exports.cliente = mongoose_1.default.model("clientes", clienteSchema);
