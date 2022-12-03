"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fornecedorSchema = new mongoose_1.default.Schema({
    id: {
        type: String
    },
    cnpj: {
        type: String,
        require: true
    },
    nomeEmpresa: {
        type: String,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
    dataCadastro: {
        type: String,
        require: true
    }
});
const fornecedor = mongoose_1.default.model("fornecedores", fornecedorSchema);
exports.default = fornecedor;
