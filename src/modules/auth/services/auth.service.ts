import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { UserLoginDto } from '../application/dtos/user-login.dto';
import { UserRepository } from '../../../infrastructure/persistance/repositories/user.repository';
import { HttpStatusCode } from '../../../common/http.status-code';
import { TokenService } from './token.service';
import { Payload } from '../config/jwt.payload';
import { User } from '../../user/domain/entities/user.entity';
import * as bcrypt from "bcryptjs";
import { TokenRepository } from '../../../infrastructure/persistance/repositories/token.repository';
import { PasswordVerifyError } from '../errors/password-verify.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoginFailedError } from '../errors/login-failed.error';


@Injectable()
export class AuthService {

  constructor(
    @Inject(TokenRepository) private tokenRepository: TokenRepository,
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(TokenService) private tokenService: TokenService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async login(dto: UserLoginDto) {
    try {
      const user = await this.userRepository.findOneByEmail(dto.email) as User;
      const payload: Payload = { id: user.id, username: user.username, email: user.email }
      const accessToken = await this.tokenService.generateAccessToken(payload)
      const refreshToken = await this.tokenService.generateRefreshToken(payload);
      await this.tokenRepository.updateToRefreshToken(Number(user.id), refreshToken);
      return {
        id: user.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        status: HttpStatusCode.OK
      }//
    } catch (e) {
      throw new LoginFailedError('Login failed.');
    }

  }

  async logout() {}

  async verify(email: string, password: string): Promise<any> {
    const user: User = await this.userRepository.findOneByEmail(email);
    const isValid: boolean = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new PasswordVerifyError('Invalid email and password is entered from client.');
    }
    return isValid;
  }
}
