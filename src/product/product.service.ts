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
    var imgId = [];
    var img = [];
    var ProviderId = String;
    if (!listProducts) throw new NotFoundException();
    else
    if(listProducts.length === 0){
      return listProducts
    }else
    for (let i of listProducts) {
      const obj = Object.keys(i.categoriaProduto)[0].toString();
      imgId.push(i.categoriaProduto[obj].imagemProduto);
      ProviderId = i.categoriaProduto[obj].fornecedor;
    }
    for (let i of imgId[0]) {
      const searchImgId = await this.imageModel.findById({ _id: i }).exec();
      img.push(searchImgId);
    }
    const searchProductId = await this.ProviderModel.findById({
      _id: ProviderId,
    }).exec();
    for (let i of listProducts) {
      const obj = Object.keys(i.categoriaProduto)[0].toString();
      i.categoriaProduto[obj].imagemProduto = [];
      i.categoriaProduto[obj].imagemProduto = img;
      i.categoriaProduto[obj].fornecedor = searchProductId;
    }

     return listProducts;
  }
  async RegisterProduct(createProduct: Product): Promise<Product> {
    const RegisterProduct = await this.productModel.create(createProduct);
    if (!RegisterProduct) throw new NotFoundException();
    else return RegisterProduct;
  }
  async searchProductId(id: string): Promise<Product> {
    const searchId = await this.productModel.findById({ _id: id }).exec();
    if (!searchId) throw new NotFoundException();
    else
    var imgId = [];
    var img = [];
    var ProviderId = String;
    const obj = Object.keys(searchId.categoriaProduto)[0].toString();
    imgId.push(searchId.categoriaProduto[obj].imagemProduto);
    ProviderId = searchId.categoriaProduto[obj].fornecedor;
    for (let i of imgId[0]) {
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

  async updateProduct(
    id: string,
    updateProduct: updateProductDTO
  ): Promise<Product> {
    const findByIdProduct = await this.productModel.findById({ _id: id });
    if(!findByIdProduct) throw new NotFoundException()
    else{
    const obj = Object.keys(findByIdProduct.categoriaProduto)[0].toString();
    const ObjUpdate = Object.keys(updateProduct.categoriaProduto)[0].toString();
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
          quantidate: updateProduct.categoriaProduto[ObjUpdate].quantidate
            ? updateProduct.categoriaProduto[ObjUpdate].quantidate
            : findByIdProduct.categoriaProduto[obj].quantidate,
          imagemProduto: updateProduct.categoriaProduto[ObjUpdate].imagemProduto
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
    const searchId = await this.productModel
      .findById({ _id: id })
      .exec();
      if(!searchId) throw new NotFoundException()
      else{
      const obj = Object.keys(searchId.categoriaProduto)[0].toString();
      searchId.categoriaProduto[obj].imagemProduto.map(async item=>{
        if(item){
       const deleteImageProduto = await this.imageModel.findByIdAndRemove({_id: item}).exec()
       return deleteImageProduto
        }
      })
      const deleteProduct = await this.productModel.findByIdAndDelete({_id: id}).exec()

    if (!searchId || !deleteProduct) throw new NotFoundException();
    else return deleteProduct;
      }
  }
}
