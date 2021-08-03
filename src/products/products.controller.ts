import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    //@Body() completeBody: {title: string, description: string, price: number} --> this is another approch
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      title,
      description,
      price,
    );
    return { id: generatedId }; //this is a valide json to return from the post request
  }
}
