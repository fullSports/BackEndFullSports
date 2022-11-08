const mongoose = require("mongoose");

const roupaSchema = new mongoose.Schema({
    id:{
        type: String
    },
    nome:{
        type: String,
        required: true
    },
    fornecedor:{
        type: mongoose.Schema.Types.ObjectId,ref:'fornecedores', 
        required: true
    },
    cor:{
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    tamanho:{
        type: Number,
        required: true
    },
    categoria:{
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
const roupa = mongoose.model("roupas", roupaSchema);
module.exports = roupa