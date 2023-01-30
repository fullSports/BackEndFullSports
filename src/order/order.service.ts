import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { response } from "express";
import { Model } from "mongoose";
import { ImageDocument, imagem } from "src/image/Schema/image.schema";
import { ProductServices } from "src/product/product.service";
import { Provider, ProviderDocument } from "src/providers/Schema/providers.schema";
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
    @InjectModel(imagem.name)
    private readonly imageModel: Model<ImageDocument>,

    @InjectModel(Provider.name)
    private readonly ProviderModel: Model<ProviderDocument>,

    private readonly ServiceProduct: ProductServices
  ) { }

  async ListOrders(): Promise<Order[]> {
    const ListOrders = await this.OrderModel.find().populate("cliente").populate("produto").exec();


    return ListOrders
  }

  async RegisterOrder(createOrderBody: Order) {

    const productId = createOrderBody.produto as any
    const findBydIdProduct = await this.ServiceProduct.searchProductId(productId)

    const obj = Object.keys(findBydIdProduct.categoriaProduto)[0].toString();
    const quantidate = findBydIdProduct.categoriaProduto[obj].quantidate as number
    if (quantidate === 0) return { messagem: "produto  sem estoque", orderPlaced: false }
    else if (quantidate - createOrderBody.quantidadePedido <= 0) return { messagem: "estoque insuficiente", orderPlaced: false }
    const newProduct = {
      categoriaProduto: {
        [obj]: {
          quantidate: quantidate - createOrderBody.quantidadePedido as number
        }
      }
    } as any
    const updateProduct = await this.ServiceProduct.updateProduct(productId, newProduct)
    if (!updateProduct) throw new NotFoundException();
    else {
      const preco = findBydIdProduct.categoriaProduto[obj].preco
      const splitPreco = preco.split("R$");
      const floatPreco = parseFloat(splitPreco[1].replace(",", "."))
      Logger.warn(floatPreco)
      createOrderBody["total"] = floatPreco * createOrderBody.quantidadePedido;

      const createOrder = await this.OrderModel.create(createOrderBody);
      return createOrder

    }

  }

  async searchIdOrder(id: string) {

  }

  // async updateOrder(
  //   id: string,
  //   updateOrderBody: UpdateOrderDTO
  // ): Promise<Order> {
  // return
  // }

  async deleteOrder(id: string) {

  }
}
