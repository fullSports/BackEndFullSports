import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { updateProductDTO } from "./dto/updateProduct.dto";
import { Product, ProductDocument } from "./Schema/product.schema";

@Injectable()
export class ProductServices {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}
  async listProducts(): Promise<Product[]> {
    const listProducts = await this.productModel
      .find()
      .populate("fornecedor")
      .populate("imagemProduto")
      .exec();
    if (!listProducts) throw new NotFoundException();
    else return listProducts;
  }
  async RegisterProduct(createProduct: Product): Promise<Product> {
    const RegisterProduct = await this.productModel.create(createProduct);
    if (!RegisterProduct) throw new NotFoundException();
    else return RegisterProduct;
  }
  async searchProductId(id: string): Promise<Product> {
    const searchId = await this.productModel
      .findById({ _id: id })
      .populate({
        path: "categoriaProduto",
        populate: [
          {
            path: "calcado",
            populate: [
              {
                path: "fornecedor",
              },
            ],
          },
        ],
      })
      .exec();
    return searchId;
  }

  async updateProduct(
    id: string,
    updateProduct: updateProductDTO
  ): Promise<Product> {
    const findByIdProduct = await this.productModel.findById(id);
    let newProduct;

    // if(findByIdProduct.categoriaProduto.calcado !== null) categoryProduct = "calcado"
    // else if(findByIdProduct.categoriaProduto.equipamento !== null) categoryProduct = "equipamento"
    // else if(findByIdProduct.categoriaProduto.roupa ! == null) c

    // if (findByIdProduct.categoriaProduto.calcado !== null) {
    //   newProduct = {
    //     nome: updateProduct.categoriaProduto.calcado.nome
    //       ? updateProduct.categoriaProduto.calcado.nome
    //       : findByIdProduct.categoriaProduto.calcado.nome,
    //     fornecedor: updateProduct.categoriaProduto.calcado.fornecedor
    //       ? updateProduct.categoriaProduto.calcado.fornecedor
    //       : findByIdProduct.categoriaProduto.calcado.fornecedor,
    //     cor: updateProduct.categoriaProduto.calcado.cor
    //       ? updateProduct.categoriaProduto.calcado.cor
    //       : findByIdProduct.categoriaProduto.calcado.cor,
    //     sexo: updateProduct.categoriaProduto.calcado.sexo
    //       ? updateProduct.categoriaProduto.calcado.sexo
    //       : findByIdProduct.categoriaProduto.calcado.sexo,
    //     tamanho: updateProduct.categoriaProduto.calcado.tamanho
    //       ? updateProduct.categoriaProduto.calcado.tamanho
    //       : findByIdProduct.categoriaProduto.calcado.tamanho,
    //     preco: updateProduct.categoriaProduto.calcado.preco
    //       ? updateProduct.categoriaProduto.calcado.preco
    //       : findByIdProduct.categoriaProduto.calcado.preco,
    //     quantidate: updateProduct.categoriaProduto.calcado.quantidade
    //       ? updateProduct.categoriaProduto.calcado.quantidade
    //       : findByIdProduct.categoriaProduto.calcado.quantidade,
    //     imagemProduto: updateProduct.categoriaProduto.calcado.imagemProduto
    //       ? updateProduct.categoriaProduto.calcado.imagemProduto
    //       : findByIdProduct.categoriaProduto.calcado.imagemProduto,
    //   };
    // } else if (findByIdProduct.categoriaProduto.equipamento !== null) {
    //   newProduct = {
    //     nome: updateProduct.categoriaProduto.equipamento.nome
    //       ? updateProduct.categoriaProduto.equipamento.nome
    //       : findByIdProduct.categoriaProduto.equipamento.nome,
    //     fornecedor: updateProduct.categoriaProduto.equipamento.fornecedor
    //       ? updateProduct.categoriaProduto.equipamento.fornecedor
    //       : findByIdProduct.categoriaProduto.equipamento.fornecedor,
    //     cor: updateProduct.categoriaProduto.equipamento.cor
    //       ? updateProduct.categoriaProduto.equipamento.cor
    //       : findByIdProduct.categoriaProduto.equipamento.cor,
    //     sexo: updateProduct.categoriaProduto.equipamento.sexo
    //       ? updateProduct.categoriaProduto.equipamento.sexo
    //       : findByIdProduct.categoriaProduto.equipamento.sexo,
    //     tamanho: updateProduct.categoriaProduto.equipamento.tamanho
    //       ? updateProduct.categoriaProduto.equipamento.tamanho
    //       : findByIdProduct.categoriaProduto.equipamento.tamanho,
    //     preco: updateProduct.categoriaProduto.equipamento.preco
    //       ? updateProduct.categoriaProduto.equipamento.preco
    //       : findByIdProduct.categoriaProduto.equipamento.preco,
    //     quantidate: updateProduct.categoriaProduto.equipamento.quantidade
    //       ? updateProduct.categoriaProduto.equipamento.quantidade
    //       : findByIdProduct.categoriaProduto.equipamento.quantidade,
    //     imagemProduto: updateProduct.categoriaProduto.equipamento.imagemProduto
    //       ? updateProduct.categoriaProduto.equipamento.imagemProduto
    //       : findByIdProduct.categoriaProduto.equipamento.imagemProduto,
    //   };
    // } else if (findByIdProduct.categoriaProduto.roupa !== null) {
    //   newProduct = {
    //     nome: updateProduct.categoriaProduto.roupa.nome
    //       ? updateProduct.categoriaProduto.roupa.nome
    //       : findByIdProduct.categoriaProduto.roupa.nome,
    //     fornecedor: updateProduct.categoriaProduto.roupa.fornecedor
    //       ? updateProduct.categoriaProduto.roupa.fornecedor
    //       : findByIdProduct.categoriaProduto.roupa.fornecedor,
    //     cor: updateProduct.categoriaProduto.roupa.cor
    //       ? updateProduct.categoriaProduto.roupa.cor
    //       : findByIdProduct.categoriaProduto.roupa.cor,
    //     sexo: updateProduct.categoriaProduto.roupa.sexo
    //       ? updateProduct.categoriaProduto.roupa.sexo
    //       : findByIdProduct.categoriaProduto.roupa.sexo,
    //     tamanho: updateProduct.categoriaProduto.roupa.tamanho
    //       ? updateProduct.categoriaProduto.roupa.tamanho
    //       : findByIdProduct.categoriaProduto.roupa.tamanho,
    //     preco: updateProduct.categoriaProduto.roupa.preco
    //       ? updateProduct.categoriaProduto.roupa.preco
    //       : findByIdProduct.categoriaProduto.roupa.preco,
    //     quantidate: updateProduct.categoriaProduto.roupa.quantidade
    //       ? updateProduct.categoriaProduto.roupa.quantidade
    //       : findByIdProduct.categoriaProduto.roupa.quantidade,
    //     imagemProduto: updateProduct.categoriaProduto.roupa.imagemProduto
    //       ? updateProduct.categoriaProduto.roupa.imagemProduto
    //       : findByIdProduct.categoriaProduto.roupa.imagemProduto,
    //   };
    // } else if (findByIdProduct.categoriaProduto.suplemento !== null) {
    //   newProduct = {
    //     nome: updateProduct.categoriaProduto.suplemento.nome
    //       ? updateProduct.categoriaProduto.suplemento.nome
    //       : findByIdProduct.categoriaProduto.suplemento.nome,
    //     fornecedor: updateProduct.categoriaProduto.suplemento.fornecedor
    //       ? updateProduct.categoriaProduto.suplemento.fornecedor
    //       : findByIdProduct.categoriaProduto.suplemento.fornecedor,
    //     cor: updateProduct.categoriaProduto.suplemento.cor
    //       ? updateProduct.categoriaProduto.suplemento.cor
    //       : findByIdProduct.categoriaProduto.suplemento.cor,
    //     sexo: updateProduct.categoriaProduto.suplemento.sexo
    //       ? updateProduct.categoriaProduto.suplemento.sexo
    //       : findByIdProduct.categoriaProduto.suplemento.sexo,
    //     tamanho: updateProduct.categoriaProduto.suplemento.tamanho
    //       ? updateProduct.categoriaProduto.suplemento.tamanho
    //       : findByIdProduct.categoriaProduto.suplemento.tamanho,
    //     preco: updateProduct.categoriaProduto.suplemento.preco
    //       ? updateProduct.categoriaProduto.suplemento.preco
    //       : findByIdProduct.categoriaProduto.suplemento.preco,
    //     quantidate: updateProduct.categoriaProduto.suplemento.quantidade
    //       ? updateProduct.categoriaProduto.suplemento.quantidade
    //       : findByIdProduct.categoriaProduto.suplemento.quantidade,
    //     imagemProduto: updateProduct.categoriaProduto.suplemento.imagemProduto
    //       ? updateProduct.categoriaProduto.suplemento.imagemProduto
    //       : findByIdProduct.categoriaProduto.suplemento.imagemProduto,
    //   };
    // }

    return;
  }

  async deleteProduct(id: string): Promise<Product> {
    const deleteProduct = await this.productModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteProduct) throw new NotFoundException();
    else return deleteProduct;
  }
}
