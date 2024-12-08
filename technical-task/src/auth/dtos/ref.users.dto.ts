import { IsEmail, IsString } from 'class-validator';

export class RefUserDto {
  @IsString()
  email: string;
}
