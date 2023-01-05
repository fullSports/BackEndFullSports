import { Document, ObjectId } from 'mongoose';

export class clientes extends Document {
    cpf: string
    nome: string
    login: ObjectId
    dataNascimento: string
    sexo: string
    cep: string
    endereco: string
    dataCadastro: string
    imagemPerfil: ObjectId
}