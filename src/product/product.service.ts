import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageDocument, imagem } from "../image/Schema/image.schema";
import {
  Provider,
  ProviderDocument,
} from "../providers/Schema/providers.schema";
import { updateProductDTO } from "./dto/updateProduct.dto";
import { Product, ProductDocument } from "./Schema/product.schema";

@Injectable()
export class ProductServices {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(imagem.name)
    private readonly imageModel: Model<ImageDocument>,
    @InjectModel(Provider.name)
    private readonly ProviderModel: Model<ProviderDocument>
  ) {}
  async listProducts(): Promise<Product[]> {
    const listProducts = await this.productModel.find().exec();
    const products: Product[] = [];
    for (const i of listProducts) {
      const searchId = await this.productModel.findById({ _id: i._id }).exec();
      if (searchId) {
        const imgId = [];
        const img = [];
        let ProviderId = String;
        const obj = Object.keys(searchId.categoriaProduto)[0].toString();
        imgId.push(searchId.categoriaProduto[obj].imagemProduto);
        ProviderId = searchId.categoriaProduto[obj].fornecedor;
        for (const i of imgId[0]) {
          const searchImgId = await this.imageModel.findById({ _id: i }).exec();
          img.push(searchImgId);
        }
        const searchProductId = await this.ProviderModel.findById({
          _id: ProviderId,
        }).exec();

        searchId.categoriaProduto[obj].imagemProduto = [];
        searchId.categoriaProduto[obj].imagemProduto = img;
        searchId.categoriaProduto[obj].fornecedor = searchProductId;

        products.push(searchId);
      }
    }
    return products;
  }
  async RegisterProduct(createProduct: Product): Promise<Product> {
    const RegisterProduct = await this.productModel.create(createProduct);
    if (!RegisterProduct) throw new NotFoundException();
    else return RegisterProduct;
  }
  async searchProductId(id: string): Promise<Product> {
    const searchId = await this.productModel.findById({ _id: id }).exec();
    if (!searchId) throw new NotFoundException();
    else {
      const imgId = [];
      const img = [];
      let ProviderId = String;
      const obj = Object.keys(searchId.categoriaProduto)[0].toString();
      imgId.push(searchId.categoriaProduto[obj].imagemProduto);
      ProviderId = searchId.categoriaProduto[obj].fornecedor;
      for (const i of imgId[0]) {
        const searchImgId = await this.imageModel.findById({ _id: i }).exec();
        img.push(searchImgId);
      }
      const searchProductId = await this.ProviderModel.findById({
        _id: ProviderId,
      }).exec();

      searchId.categoriaProduto[obj].imagemProduto = [];
      searchId.categoriaProduto[obj].imagemProduto = img;
      searchId.categoriaProduto[obj].fornecedor = searchProductId;

      return searchId;
    }
  }

  async updateProduct(
    id: string,
    updateProduct: updateProductDTO
  ): Promise<Product> {
    const findByIdProduct = await this.productModel.findById({ _id: id });
    if (!findByIdProduct) throw new NotFoundException();
    else {
      const obj = Object.keys(findByIdProduct.categoriaProduto)[0].toString();
      const ObjUpdate = Object.keys(
        updateProduct.categoriaProduto
      )[0].toString();
      const newProduct = {
        categoriaProduto: {
          [ObjUpdate]: {
            nome: updateProduct.categoriaProduto[ObjUpdate].nome
              ? updateProduct.categoriaProduto[ObjUpdate].nome
              : findByIdProduct.categoriaProduto[obj].nome,
            fornecedor: updateProduct.categoriaProduto[ObjUpdate].fornecedor
              ? updateProduct.categoriaProduto[ObjUpdate].fornecedor
              : findByIdProduct.categoriaProduto[obj].fornecedor,
            cor: updateProduct.categoriaProduto[ObjUpdate].cor
              ? updateProduct.categoriaProduto[ObjUpdate].cor
              : findByIdProduct.categoriaProduto[obj].cor,
            sexo: updateProduct.categoriaProduto[ObjUpdate].sexo
              ? updateProduct.categoriaProduto[ObjUpdate].sexo
              : findByIdProduct.categoriaProduto[obj].sexo,
            tamanho: updateProduct.categoriaProduto[ObjUpdate].tamanho
              ? updateProduct.categoriaProduto[ObjUpdate].tamanho
              : findByIdProduct.categoriaProduto[obj].tamanho,
            preco: updateProduct.categoriaProduto[ObjUpdate].preco
              ? updateProduct.categoriaProduto[ObjUpdate].preco
              : findByIdProduct.categoriaProduto[obj].preco,
            quantidade: updateProduct.categoriaProduto[ObjUpdate].quantidade
              ? updateProduct.categoriaProduto[ObjUpdate].quantidade
              : findByIdProduct.categoriaProduto[obj].quantidade,
            imagemProduto: updateProduct.categoriaProduto[ObjUpdate]
              .imagemProduto
              ? updateProduct.categoriaProduto[ObjUpdate].imagemProduto
              : findByIdProduct.categoriaProduto[obj].imagemProduto,
          },
        },
      };
      const updateNewProduct = await this.productModel
        .findByIdAndUpdate(id, newProduct)
        .exec();
      if (!updateNewProduct) throw new NotFoundException();
      else return updateNewProduct;
    }
  }

  async deleteProduct(id: string) {
    const searchId = await this.productModel.findById({ _id: id }).exec();
    if (!searchId) throw new NotFoundException();
    else {
      const obj = Object.keys(searchId.categoriaProduto)[0].toString();
      searchId.categoriaProduto[obj].imagemProduto.map(async (item) => {
        if (item) {
          const deleteImageProduto = await this.imageModel
            .findById({ _id: item })
            .exec();
          if (deleteImageProduto) {
            await deleteImageProduto.remove();
          }
        }
      });
      const deleteProduct = await this.productModel
        .findByIdAndDelete({ _id: id })
        .exec();

      if (!searchId || !deleteProduct) throw new NotFoundException();
      else return deleteProduct;
    }
  }

  async searchProducts(search: string): Promise<Product[]> {
    Logger.debug(search);
    const searchFormat = search
      .normalize("NFD")
      .replace(/[^a-zA-Z\s]/g, "")
      .toLowerCase();
    Logger.debug(searchFormat);
    const listProducts = await this.listProducts();
    // for(let i=0;i < listarTodosProdutos.length; i++){
    //   if()
    // }

    return listProducts;
  }
}
