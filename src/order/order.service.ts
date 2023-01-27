import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { response } from "express";
import { Model } from "mongoose";
import { ProductServices } from "src/product/product.service";
import { Product, ProductDocument } from "../product/Schema/product.schema";
import { Users, UsersDocument } from "../users/Schema/user.schema";
import { UpdateOrderDTO } from "./dto/updateOrder.dto";
import { Order, OrderDocument } from "./Schema/order.schema";


@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name)
        private readonly OrderModel: Model<OrderDocument>,
        @InjectModel(Users.name)
        private readonly UserModel: Model<UsersDocument>,
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,

        private readonly ProductService: ProductServices
    ) { }

    async ListOrders(): Promise<Order[]> {
        const listOrders = await this.OrderModel.find().populate("cliente").populate("produto").exec();
        if (!listOrders) throw new NotFoundException()
        else {
            let newListOders = []
            for (let i of listOrders) {
                const product = i.produto as any
                const listPorduct = await this.ProductService.searchProductId(product)
                if (!listPorduct) {
                    const ListOrder = {
                        quantidadePedido: i.quantidadePedido,
                        produto: "produto não encontrado",
                        cliente: i.cliente,
                        total: i.total
                    }
                    newListOders.unshift(ListOrder)
                } else {
                    const ListOrder = {
                        quantidadePedido: i.quantidadePedido,
                        produto: listPorduct,
                        cliente: i.cliente,
                        total: i.total
                    }
                    newListOders.unshift(ListOrder)
                }
            }
            return newListOders
        }
    }

    async RegisterOrder(createOrder: Order) {
        const RegisterOrder = await this.OrderModel.create(createOrder);

        if (!RegisterOrder) throw new NotFoundException()
        else {
            const product = createOrder.produto as any;
            const user = createOrder.cliente as any;
            const quantidade = createOrder.quantidadePedido as number
            const findByIdProduct = await this.ProductService.searchProductId(product)
            const findByIdUser = await this.UserModel.findById({ _id: user }).exec();
            if (!findByIdProduct) return response.status(404).send({ messagem: "produto não existe" })
            else if (!findByIdUser) return response.status(404).send({ messagem: "cliente não existe" })
            else {
                const obj = Object.keys(findByIdProduct.categoriaProduto)[0].toString();
                const ObjUpdate = Object.keys(findByIdProduct.categoriaProduto)[0].toString();
                const newProduct = {
                    categoriaProduto: {
                        [ObjUpdate]: {
                            nome: findByIdProduct.categoriaProduto[ObjUpdate].nome,
                            fornecedor: findByIdProduct.categoriaProduto[obj].fornecedor,
                            cor: findByIdProduct.categoriaProduto[obj].cor,
                            sexo: findByIdProduct.categoriaProduto[obj].sexo,
                            tamanho: findByIdProduct.categoriaProduto[obj].tamanho,
                            preco: findByIdProduct.categoriaProduto[obj].preco,
                            quantidate: findByIdProduct.categoriaProduto[obj].quantidade - quantidade,
                            imagemProduto: findByIdProduct.categoriaProduto[obj].imagemProduto,
                        },
                    },
                };
                const updateNewProduct = await this.productModel
                    .findByIdAndUpdate(product, newProduct)
                    .exec();
                if (!updateNewProduct) throw new NotFoundException();
                else {
                    const createOrder = await this.OrderModel.create(RegisterOrder)
                    if (!createOrder) throw new NotFoundException();
                    else {
                        createOrder["total"] = findByIdProduct.categoriaProduto[obj].preco * quantidade
                        return createOrder
                    }
                }
            }
        }
    }

    async searchIdOrder(id: string) {
        const searchId = await this.OrderModel.findById({ _id: id }).exec()
        if (!searchId) throw new NotFoundException()
        const { produto, cliente, total, quantidadePedido } = searchId
        let product = produto as any
        const listUser = await this.UserModel.findById({ _id: cliente }).populate("imagemPerfil").exec()
        if (!listUser) throw new NotFoundException()
        const listPorduct = await this.ProductService.searchProductId(product)
        if (!listPorduct) throw new NotFoundException()
        else {
            const ListOrder = {
                quantidadePedido: quantidadePedido,
                produto: listPorduct,
                cliente: listUser,
                total: total
            }
            return ListOrder
        }
    }

    async updateOrder(id: string, updateOrderBody: UpdateOrderDTO): Promise<Order> {
        const findByIdOrder = await this.OrderModel.findById({ _id: id }).exec();
        if (!findByIdOrder) throw new NotFoundException();
        else {
            const findByIdProduct = await this.productModel.findById({_id: updateOrderBody.produto ? updateOrderBody.produto : findByIdOrder.produto})
            if(!findByIdProduct) throw new NotFoundException()
            else{
                const obj = Object.keys(findByIdProduct.categoriaProduto)[0].toString();
            const newOrder = {
                quantidadePedido: updateOrderBody.quantidadePedido ? updateOrderBody.quantidadePedido : findByIdOrder.quantidadePedido,
                produto: updateOrderBody.produto ? updateOrderBody.produto : findByIdOrder.produto,
                cliente: updateOrderBody.cliente ? updateOrderBody.cliente : findByIdOrder.cliente,
                total: updateOrderBody.quantidadePedido ?  updateOrderBody.quantidadePedido * findByIdProduct.categoriaProduto[obj].quantidade : findByIdOrder.total
            }
            const updateOrder = await this.OrderModel.findByIdAndUpdate(id, newOrder)
                .setOptions({ overwrite: false, new: true });
            if (!updateOrder) throw new NotFoundException()
            else return updateOrder
        }
    }
    }

    async deleteOrder(id: string) {
        const searchIdAndDelete = await this.OrderModel.findByIdAndDelete(id).exec();
        if (!searchIdAndDelete) throw new NotFoundException();
        else return {
            messagem: "pedido deletado com sucesso"
        }
    }
}