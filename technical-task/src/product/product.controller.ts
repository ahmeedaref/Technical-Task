import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async createProduct(@Body() body: ProductDto) {
    const product = this.productService.create(body);

    return product;
  }
  @Get()
  async getAllProduct() {
    return this.productService.findAllProduct();
  }
  @Get('/:id')
  async getOneProduct(@Param('id') id: string) {
    const Product = await this.productService.findOneProduct(id);
    return Product;
  }
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    return product;
  }
}
