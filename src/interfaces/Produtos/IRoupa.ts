import {IFornecedor} from "../IFornecedor"
import {Iimagem} from "../Iimagem"
export interface IRoupa{
    _id: string,
    nome: string,
    fornecedor: IFornecedor,
    cor: string,
    sexo: string,
    tamanho: number
    preco: string,
    quantidade: number,
    imagemProduto: [
    Iimagem
    ]
}