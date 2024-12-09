import { IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;
  @IsNumber()
  price?: number;
  @IsString()
  decription?: string;
  @IsString()
  category?: string;
  @IsString()
  createdBy?: string;
}
