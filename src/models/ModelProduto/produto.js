"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const produtoSchema = new mongoose_1.default.Schema({
    id: {
        type: String
    },
    categoriaProduto: {
        roupa: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'roupas' },
        equipamento: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'equipamentos' },
        suplemento: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'suplementos' },
        calcado: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'calcados' },
    },
    dataCadastro: {
        type: String,
        required: true
    },
});
const produto = mongoose_1.default.model("produtos", produtoSchema);
exports.default = produto;
