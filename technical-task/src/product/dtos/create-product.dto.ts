import { IsString, IsNumber, IsEmail } from 'class-validator';

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
  createdBy?: string;
}
