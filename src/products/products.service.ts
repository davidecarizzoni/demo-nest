import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = []; //initialize an empty array of product (private because it is used only in this service)

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProd = new this.productModel({ title, description, price });
    const res = await newProd.save();
    console.log({ res });
    return res;
  }

  async getProducts() {
    const result = await this.productModel.find().exec();
    return [...result]; //new array using spread operator
  }

  getProduct(id: string) {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updateProduct = { ...product };

    if (title) updateProduct.title = title;
    if (description) updateProduct.description = description;
    if (price) updateProduct.price = price;

    this.products[index] = updateProduct;
  }

  deleteProduct(id: string) {
    this.products = [...this.products.filter((prod) => prod.id !== id)];
  }

  //UTILS
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Not found');
    }
    return [product, productIndex];
  }
}
