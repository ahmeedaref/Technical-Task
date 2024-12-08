import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductDto } from './dtos/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { productDocument } from 'src/schemas/product-schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/schemas/users-schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<productDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async create(data: ProductDto) {
    try {
      const { name } = data;
      const product = await this.productModel.findOne({ name });
      if (product) {
        throw new BadRequestException('product is already exists');
      }
      const Prod = new this.productModel(data);
      return Prod.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAllProduct(): Promise<productDocument[]> {
    return this.productModel.find();
  }

  async findOneProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new BadRequestException('product not found');
    }
    return product;
  }
}
