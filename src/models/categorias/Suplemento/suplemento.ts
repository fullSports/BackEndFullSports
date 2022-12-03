import mongoose from "mongoose";

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
    preco:{
        type:String,
        required:true
    }, 
    quantidade:{
        type:Number, 
        min: [1, 'Quantidade nao pode ser inferior a 1'],
        required:true
    },
    imagemProduto: [
        {type: mongoose.Schema.Types.ObjectId,ref: 'imagem',index: true,default:[],required: true}
    ]
})

const suplemento = mongoose.model("suplementos", suplementoSchema);
export default suplemento;