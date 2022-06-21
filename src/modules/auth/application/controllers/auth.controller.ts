import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { UserLoginDto } from '../dtos/user-login.dto';
import { AuthGuards } from '../../guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @UseGuards(AuthGuards)
  async login(@Body() data: UserLoginDto): Promise<any> {
    try {
      return await this.authService.login(data);
    } catch (e) {

    }
  }

  @Post("/")
  async logout() {}
}
