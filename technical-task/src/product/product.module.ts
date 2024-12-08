import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/product-schema';
import { User, UserSchema } from 'src/schemas/users-schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthValidate } from 'src/gaurds/validate-token';
import { CheckAdmin } from 'src/gaurds/check-admin';
import { checkToken } from 'src/gaurds/check-token';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.modelName, schema: ProductSchema },
      { name: User.modelName, schema: UserSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    AuthService,
    JwtService,
    AuthValidate,
    checkToken,
    CheckAdmin,
    {
      provide: 'role',
      useValue: 'Admin',
    },
  ],
  exports: ['role'],
})
export class ProductModule {}
