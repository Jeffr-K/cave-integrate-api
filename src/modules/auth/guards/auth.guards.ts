import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseBase } from '../../../common/response.base';
import { HttpStatusCode } from '../../../common/http.status-code';
import { TokenService } from '../services/token.service';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { PasswordVerifyError } from '../errors/password-verify.error';
import { LoginFailedError } from '../errors/login-failed.error';

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private tokenService: TokenService, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request);
  }

  private async validate(request: any): Promise<boolean | any> {
    const jwt: string = request.headers.authorization.split('Bearer ')[1];
    const email = request.body.email;
    const password = request.body.password;
    const decoded = await this.tokenService.validate(jwt);
    const verifyPassword = await this.authService.verify(email, password);
    return !!(email === decoded.email && verifyPassword);
  }
}