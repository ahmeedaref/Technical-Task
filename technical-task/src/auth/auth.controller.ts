import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/create-users';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: UserDto) {
    const user = await this.authService.register(body);
    return user;
  }

  @Post('login')
  async login(@Body() body: UserDto) {
    const user = await this.authService.login(body);
    return user;
  }
}
