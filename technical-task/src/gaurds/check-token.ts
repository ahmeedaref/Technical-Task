import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthValidate } from './validate-token';

@Injectable()
export class checkToken implements CanActivate {
  constructor(private authValidate: AuthValidate) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const decode = this.authValidate.validateToken(token);
      request.User = decode;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
