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
    const products = await this.productModel.find().exec();
    return products.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      price: p.price,
    }));
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return product;
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(id);

    if (title) updateProduct.title = title;
    if (description) updateProduct.description = description;
    if (price) updateProduct.price = price;

    const res = await updateProduct.save();
    return res;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('No data found');
    }
  }

  //UTILS
  private async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Not found');
    }
    console.log({ product });
    return product;
  }
}
