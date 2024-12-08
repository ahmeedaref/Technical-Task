import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product-dtos';
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
  @Patch('/:id')
  async UpdateProduct(
    @Param('id') id: string,
    @Body() body: Partial<UpdateProductDto>,
  ) {
    const product = this.productService.UpdateProduct(id, body);
    return product;
  }
}
