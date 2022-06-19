import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { UserLoginRequestAdapter } from '../../../../adapters/in/user.login-request.adapter';
import { ResponseBase } from '../../../../common/response.base';
import { HttpStatusCode } from '../../../../common/http.status-code';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(data: UserLoginRequestAdapter): Promise<any> {
    try {
      const login = await this.authService.login(data);
      if (!login) {
        return await new ResponseBase(HttpStatusCode.SERVER_ERROR, 'false');
      }
      return await new ResponseBase(HttpStatusCode.ACCEPTED, 'true');
    } catch (e: unknown) {}
  }

  @Post()
  async logout() {}
}
