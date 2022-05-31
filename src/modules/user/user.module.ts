import { Module } from "@nestjs/common";
import { UserController } from "src/modules/user/application/controllers/user.controller";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { UserDropService } from "./domain/services/user-drop.service";
import { UserRegisterService } from "./domain/services/user-register.service";


const Providers = [UserRegisterService, UserDropService, UserRepository];
const Controllers = [UserController]

@Module({
  imports: [],
  controllers: [...Controllers],
  providers: [...Providers],
  exports: []
})
export class UserModule {}