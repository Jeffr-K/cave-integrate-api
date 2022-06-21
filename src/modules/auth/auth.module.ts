import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { AuthGuards } from './guards/auth.guards';
import { AuthController } from './application/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { TokenRepository } from '../../infrastructure/persistance/repositories/token.repository';


const Controllers = [AuthController];
const Services = [TokenService, AuthService, AuthGuards, TokenRepository];

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [...Controllers],
  providers: [...Services],
  exports: [TokenService, AuthService, AuthGuards],
})
export class AuthModule {}
