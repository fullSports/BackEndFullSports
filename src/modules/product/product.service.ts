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
    const listProducts = await this.productModel.find().lean().exec();
    return listProducts;
  }

  async RegisterProduct(createProduct: Product): Promise<Product> {
    const RegisterProduct = await this.productModel.create(createProduct);
    if (!RegisterProduct) {
      throw new NotFoundException();
    }
    return RegisterProduct;
  }
  async searchProductId(id: string): Promise<Product> {
    const searchId = await this.productModel.findById({ _id: id }).exec();
    if (!searchId) throw new NotFoundException();
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

  async updateProduct(
    id: string,
    updateProduct: updateProductDTO
  ): Promise<Product> {
    const findByIdProduct = await this.productModel.findById({ _id: id });
    if (!findByIdProduct) {
      throw new NotFoundException();
    }
    const currentCategoryKey = Object.keys(findByIdProduct.categoriaProduto)[0];
    const updatedCategoryKey = Object.keys(updateProduct.categoriaProduto)[0];
    const currentCategory =
      findByIdProduct.categoriaProduto[currentCategoryKey];
    const updatedCategory = updateProduct.categoriaProduto[updatedCategoryKey];
    const newProductData = {
      categoriaProduto: {
        [updatedCategoryKey]: {
          nome: updatedCategory.nome ?? currentCategory.nome,
          fornecedor: updatedCategory.fornecedor ?? currentCategory.fornecedor,
          cor: updatedCategory.cor ?? currentCategory.cor,
          sexo: updatedCategory.sexo ?? currentCategory.sexo,
          tamanho: updatedCategory.tamanho ?? currentCategory.tamanho,
          preco: updatedCategory.preco ?? currentCategory.preco,
          quantidade: updatedCategory.quantidade ?? currentCategory.quantidade,
          imagemProduto:
            updatedCategory.imagemProduto ?? currentCategory.imagemProduto,
        },
      },
    };
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, newProductData, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException();
    }
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findById({ _id: id }).exec();
    if (!product) {
      throw new NotFoundException();
    }
    const categoryKey = Object.keys(product.categoriaProduto)[0];
    const images = product.categoriaProduto[categoryKey].imagemProduto;
    await Promise.all(
      images.map(async (imageId) => {
        if (imageId) {
          const image = await this.imageModel.findById({ _id: imageId }).exec();
          if (image) {
            await image.remove();
          }
        }
      })
    );
    const deletedProduct = await this.productModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deletedProduct) {
      throw new NotFoundException();
    }
    return deletedProduct;
  }

  async searchProducts(search: string): Promise<Product[]> {
    const normalizeString = (str: string): string =>
      str
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "")
        .toLowerCase();
    const searchFormat = normalizeString(search);
    const listProducts = await this.listProducts();
    const searchCategories = ["calcado", "equipamento", "suplemento", "roupa"];
    const ListProductResult = listProducts.filter((product) => {
      const categoryKey = Object.keys(product.categoriaProduto)[0];
      const categoryName = product.categoriaProduto[categoryKey].nome;
      if (
        searchCategories.includes(categoryKey) &&
        searchFormat.includes(categoryKey)
      ) {
        return true;
      }
      const normalizedProductName = normalizeString(categoryName);
      return normalizedProductName.includes(searchFormat);
    });
    Logger.debug(ListProductResult);
    return ListProductResult;
  }
}
