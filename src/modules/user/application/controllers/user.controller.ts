import { Controller, Delete, Get, Inject, LoggerService, Post, Put } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { UserCreateRequestAdapter } from "src/adapters/in/user.create-request.adapter";
import { domain } from "src/common/controller-url-routing";
import { HttpStatusCode } from "src/common/http.status-code";
import { ResponseBase } from "src/common/response.base";
import { UserDropService } from "src/modules/user/domain/services/user-drop.service";
import { UserRegisterService } from "src/modules/user/domain/services/user-register.service";

@Controller(domain.router.user)
export class UserController {

  constructor(
    private readonly userRegisterService: UserRegisterService,
    private readonly userDropService: UserDropService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}
  
  @Post("/")
  async create(data: UserCreateRequestAdapter): Promise<any | void> {
    try {
      const local = this.userRegisterService.register(data);
      const social = this.userRegisterService.register(data);
      if (!local) {
        return new ResponseBase(HttpStatusCode.SERVER_ERROR); 
      }
      return local;
    } catch (e: unknown) {
      this.logger.debug("User create Controller :>", e)
    }
  }
  
  @Put("/")
  async update(): Promise<void> {

  }
  
  @Delete("/")
  async delete(id: string): Promise<any | void> {
    try {
      const response = await this.userDropService.drop(id);
      if (!response) {
        return new ResponseBase(HttpStatusCode.SERVER_ERROR);
      }
      return response;
    } catch (e: unknown) {
      
    }
  }
  
  @Get("/")
  async findById(): Promise<void> {

  }

}