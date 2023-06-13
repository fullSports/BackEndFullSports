import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageDocument, imagem } from "src/image/Schema/image.schema";
import { ProductServices } from "src/product/product.service";
import {
  Provider,
  ProviderDocument,
} from "src/providers/Schema/providers.schema";
import { Product, ProductDocument } from "../product/Schema/product.schema";
import { Users, UsersDocument } from "../users/Schema/user.schema";
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
  ) {}

  async ListOrders(): Promise<Order[]> {
    const ListOrders = await this.OrderModel.find().exec();
    const newListOrders = [];
    for (const i of ListOrders) {
      const product = await this.ServiceProduct.searchProductId(
        i.produto as any
      );
      if(i.cliente){
      const client = await this.UserModel.findById({ _id: i.cliente as any })
        .populate("imagemPerfil")
        .exec();
      const order = {
        _id: i._id,
        quantidadePedido: i.quantidadePedido,
        produto: product,
        cliente: client,
        total: i.total,
        __v: i.__v,
      };
      newListOrders.push(order);
    }
    }
    return newListOrders;
  }

  async RegisterOrder(createOrderBody: Order) {
    const productId = createOrderBody.produto as any;
    const findBydIdProduct = await this.ServiceProduct.searchProductId(
      productId
    );

    const obj = Object.keys(findBydIdProduct.categoriaProduto)[0].toString();
    const quantidate = findBydIdProduct.categoriaProduto[obj]
      .quantidate as number;
    if (quantidate === 0)
      return { messagem: "produto  sem estoque", orderPlaced: false };
    else if (quantidate - createOrderBody.quantidadePedido <= 0)
      return { messagem: "estoque insuficiente", orderPlaced: false };
    const newProduct = {
      categoriaProduto: {
        [obj]: {
          quantidate: (quantidate - createOrderBody.quantidadePedido) as number,
        },
      },
    } as any;
    const updateProduct = await this.ServiceProduct.updateProduct(
      productId,
      newProduct
    );
    if (!updateProduct) throw new NotFoundException();
    else {
      const preco = findBydIdProduct.categoriaProduto[obj].preco;
      const floatPreco = parseFloat(preco.replace(",", "."));
      createOrderBody["total"] = floatPreco * createOrderBody.quantidadePedido;

      const createOrder = await this.OrderModel.create(createOrderBody);
      return createOrder;
    }
  }

  async searchIdOrder(id: string) {
    const ListOrder = await this.OrderModel.findById(id).exec();
    const product = await this.ServiceProduct.searchProductId(
      ListOrder.produto as any
    );
    const client = await this.UserModel.findById({
      _id: ListOrder.cliente as any,
    })
      .populate("imagemPerfil")
      .exec();
    const order = {
      _id: ListOrder._id,
      quantidadePedido: ListOrder.quantidadePedido,
      produto: product,
      cliente: client,
      total: ListOrder.total,
      __v: ListOrder.__v,
    };
    return order;
  }

  async deleteOrder(id: string) {
    const findBydIdOrder = await this.OrderModel.findById({ _id: id }).exec();
    if (!findBydIdOrder) throw new NotFoundException();
    const findBydIdProduct = await this.ServiceProduct.searchProductId(
      findBydIdOrder.produto as any
    );

    const obj = Object.keys(findBydIdProduct.categoriaProduto)[0].toString();
    const quantidate = findBydIdProduct.categoriaProduto[obj]
      .quantidate as number;
    if (quantidate <= 0) {
      findBydIdOrder.remove();
      return {
        messagem: "pedido deletado com sucesso",
        ProductUpdate: false,
      };
    } else {
      const newProduct = {
        categoriaProduto: {
          [obj]: {
            quantidate: (quantidate +
              findBydIdOrder.quantidadePedido) as number,
          },
        },
      } as any;
      const updateProduct = await this.ServiceProduct.updateProduct(
        findBydIdOrder.produto as any,
        newProduct
      );
      if (!updateProduct) {
        findBydIdOrder.remove();
        return {
          messagem: "pedido deletado com sucesso",
          ProductUpdate: false,
        };
      } else {
        findBydIdOrder.remove();
        return {
          messagem: "pedido deletado com sucesso",
          ProductUpdate: true,
        };
      }
    }
  }
}
