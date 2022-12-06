import mongoose from "mongoose";
const produtoSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        categoriaProduto: {
            roupa: { type: mongoose.Schema.Types.ObjectId, ref: 'roupas' },
            equipamento: { type: mongoose.Schema.Types.ObjectId, ref: 'equipamentos' },
            suplemento: { type: mongoose.Schema.Types.ObjectId, ref: 'suplementos' },
            calcado:{ type: mongoose.Schema.Types.ObjectId, ref: 'calcados' },
        },
        dataCadastro:{
            type: String,
            required:true
        },
    });
const produto = mongoose.model("produtos", produtoSchema);
export  default produto;