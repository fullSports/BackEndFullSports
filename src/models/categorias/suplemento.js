const mongoose = require("mongoose");

const suplementoSchema = new mongoose.Schema({
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
    preco:{
        type:String,
        required:true
    }, 
    quantidade:{
        type:Number, 
        required:true
    },
    imagemProduto: [
        {type: mongoose.Schema.Types.ObjectId,ref: 'imagem',index: true,default:[],required: true}
    ]

})

const suplemento = mongoose.model("suplementos", suplementoSchema);
module.exports = suplemento;