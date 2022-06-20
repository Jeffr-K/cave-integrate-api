import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { AuthGuards } from './guards/auth.guards';
import { AuthController } from './application/controllers/auth.controller';


const Controllers = [AuthController];
const Services = [TokenService, AuthService, AuthGuards];

@Module({
  imports: [],
  controllers: [...Controllers],
  providers: [...Services],
  exports: [TokenService, AuthService, AuthGuards],
})
export class AuthModule {}
