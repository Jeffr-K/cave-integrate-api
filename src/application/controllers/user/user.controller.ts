import { Controller, Delete, Get, Inject, LoggerService, Post, Put } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { UserCreateRequestAdapter } from "src/adapters/in/user.create-request.adapter";
import { domain } from "src/application/common/controller-url-routing";
import { HttpStatusCode } from "src/common/http.status-code";
import { ResponseBase } from "src/common/response.base";
import { UserService } from "src/domain/user/services/user.service";


@Controller(domain.router.user)
export class UserController {

  constructor(
    @Inject() private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(ResponseBase) private responseBase: ResponseBase
  ) {}
  
  @Post()
  async create(data: UserCreateRequestAdapter): Promise<any> {
    try {
      const local = this.userService.createUser(data);
      const social = this.userService.createUser(data);
      if (!local) {
        return new ResponseBase(HttpStatusCode.SERVER_ERROR); 
      }
      return local;
    } catch (e: unknown) {
      
    }
  }
  
  @Put()
  async update(): Promise<void> {

  }
  
  @Delete()
  async delete(): Promise<void> {

  }
  
  @Get()
  async findById(): Promise<void> {

  }

}