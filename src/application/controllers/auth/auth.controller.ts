import { Controller, Post } from "@nestjs/common";
import { UserLoginRequestAdapter } from "src/adapters/in/user.login-request.adapter";
import { domain } from "src/application/common/controller-url-routing";
import { HttpStatusCode } from "src/common/http.status-code";
import { ResponseBase } from "src/common/response.base";
import { AuthService } from "src/domain/auth/services/auth.service";

@Controller(domain.router.auth)
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

    } catch (e: unknown) {
      
    }
  }

  @Post()
  async logout() {}

}