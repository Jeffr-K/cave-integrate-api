import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseBase } from '../../../common/response.base';
import { HttpStatusCode } from '../../../common/http.status-code';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request);
  }
ㅎ
  private async validate(request: any): Promise<boolean | any> {
    const jwt: string = request.authorization.split('Bearer ')[1];
    const isValid: boolean = await this.authService.verify(jwt);
    if (!isValid) {
      return new ResponseBase(HttpStatusCode.UNAUTHORIZED, 'The user is not valid.');
    }
    return true;
  }
}