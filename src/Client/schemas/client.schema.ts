import * as mongoose from 'mongoose';
const Cliente = new mongoose.Schema({
    cpf: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    login: {
        type: mongoose.Schema.Types.ObjectId, ref: 'login',
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
        type: mongoose.Schema.Types.ObjectId, ref: 'imagem'
    }
})
const ClientSchema = mongoose.model("clientes", Cliente);
export default ClientSchema;

// export const ClientSchema = new mongoose.Schema({
//     cpf: String,
//     nome:String,
//     login: mongoose.Schema.Types.ObjectId, ref: 'login',
//     dataNascimento:String,
//     sexo:String,
//     cep:String,
//     endereco:String,
//     dataCadastro:String,
//     imagemPerfil:mongoose.Schema.Types.ObjectId, ref: 'imagem'
// })