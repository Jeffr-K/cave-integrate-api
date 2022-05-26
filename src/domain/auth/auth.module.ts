import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";

const Controllers = [];
const Services = [TokenService, AuthService]
@Module({
  imports: [],
  controllers: [],
  providers: [...Services],
  exports: []
})
export class AuthModule {}