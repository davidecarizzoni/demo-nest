import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'; //patch merge change put replace
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    //@Body() completeBody: {title: string, description: string, price: number} --> this is another approch
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const res = await this.productsService.insertProduct(
      title,
      description,
      price,
    );
    return res; //this is a valide json to return from the post request
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const result = await this.productsService.updateProduct(
      id,
      title,
      description,
      price,
    );
    return result;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
    return null;
  }
}
