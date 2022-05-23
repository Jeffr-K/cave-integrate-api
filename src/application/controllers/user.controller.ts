import { Controller, Inject, LoggerService } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { UserService } from "src/domain/user/services/user.service";

@Controller()
export class UserController {

  constructor(
    @Inject() private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async create(): Promise<void> {}
  
  async update(): Promise<void> {}
  
  async delete(): Promise<void> {}
  
  async findById(): Promise<void> {}
}