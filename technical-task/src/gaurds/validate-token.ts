import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthValidate {
  constructor(
    private configService: ConfigService,
    private JwtService: JwtService,
  ) {}
  validateToken(token: string) {
    try {
      const secretKey = this.configService.get<string>('ACCESSTOKEN');
      if (!secretKey) {
        throw new UnauthorizedException(
          'No secret key found for token verification',
        );
      }

      const accesstoken = this.JwtService.verify(token, { secret: secretKey });
      return accesstoken;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
