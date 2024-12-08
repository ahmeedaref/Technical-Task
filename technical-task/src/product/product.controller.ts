import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product-dtos';
import { CheckAdmin } from 'src/gaurds/check-admin';
import { checkToken } from '../gaurds/check-token';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(checkToken)
  @Post()
  async createProduct(@Body() body: ProductDto) {
    const product = this.productService.create(body);

    return product;
  }
  @UseGuards(checkToken)
  @Get()
  async getAllProduct() {
    return this.productService.findAllProduct();
  }
  @UseGuards(checkToken)
  @Get('/:id')
  async getOneProduct(@Param('id') id: string) {
    const Product = await this.productService.findOneProduct(id);
    return Product;
  }
  @UseGuards(CheckAdmin)
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    return product;
  }
  @UseGuards(checkToken)
  @Patch('/:id')
  async UpdateProduct(
    @Param('id') id: string,
    @Body() body: Partial<UpdateProductDto>,
  ) {
    const product = this.productService.UpdateProduct(id, body);
    return product;
  }
}
