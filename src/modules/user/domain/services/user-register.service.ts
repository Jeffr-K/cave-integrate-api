import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserCreateRequestAdapter } from "src/adapters/in/user.create-request.adapter";
import { HttpStatusCode } from "src/common/http.status-code";
import { ResponseBase } from "src/common/response.base";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { User } from "../entities/user.entity";
import { IUserOutBoundPort } from "../ports/out/user.out-bound.port";

@Injectable()
export class UserRegisterService {
  
  constructor (@Inject(UserRepository) private readonly port: IUserOutBoundPort) {}

  async register(data: any): Promise<any> {
    try {
      const user = this.port.register(data);
      if (!user) {
        return new ResponseBase(HttpStatusCode.SERVER_ERROR);
      }
      return new ResponseBase(HttpStatusCode.CREATED);  
    } catch (e: unknown) {
      throw new NotFoundException(e);
    }
  }
}