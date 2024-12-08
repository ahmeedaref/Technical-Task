import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahmedaref127:ahmeed1902@backenddb.1rq3a.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
