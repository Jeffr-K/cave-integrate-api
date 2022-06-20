import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { ResponseBase } from '../../../../common/response.base';
import { HttpStatusCode } from '../../../../common/http.status-code';
import { UserLoginDto } from '../dtos/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(data: UserLoginDto): Promise<any> {
    // 이메일과 패스워드를 받음 -> 회원인지 아닌지 조회함
    // 회원이 맞으면 유저 서비스로 위임
    try {
      // 회원 서비스로 로그인 이벤트를 보냄

    } catch (e: unknown) {}
  }

  @Post("/")
  async logout() {}
}
