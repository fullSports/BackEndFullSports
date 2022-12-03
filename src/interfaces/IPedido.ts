import {ICliente} from "./ICliente";
import {IProduto} from "./IProduto";

export interface IPedido {
    _id: string,
    quantidadePedido: number,
    produto: IProduto,
    cliente: ICliente
    total: number
}