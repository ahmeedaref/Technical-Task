import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
  @IsString()
  description?: string;
  @IsString()
  category?: string;
  @IsString()
  @IsMongoId()
  createdBy: string;
}
