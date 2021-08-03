import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = []; //initialize an empty array of product

  insertProduct(title: string, description: string, price: number) {
    const prodId = new Date().toString();
    const newProd = new Product(prodId, title, description, price);
    this.products.push(newProd);
    console.log(this.products);
    return prodId;
  }
}
