const mongoose = require("mongoose");

const equipamentoSchema = new mongoose.Schema({
    id: {
        type: String
    },
    fornecedor:{
        type: mongoose.Schema.Types.ObjectId,ref:'fornecedores', 
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    preco:{
        type:String,
        required:true
    }, 
    quantidade:{
        type:Number, 
        required:true
    },
    dataCadastro:{
        type: String,
    },
    imagemProduto: [
        {type: mongoose.Schema.Types.ObjectId,ref: 'imagem',index: true,default:[],required: true}
    ]
})

const equipamento = mongoose.model("equipamentos", equipamentoSchema);
module.exports = equipamento;