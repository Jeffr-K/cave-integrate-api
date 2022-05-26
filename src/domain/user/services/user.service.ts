import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpStatusCode } from "src/common/http.status-code";
import { ResponseBase } from "src/common/response.base";
import { User } from "../entities/user.entity";
@Injectable()
export class UserService {
  
  constructor () {}

  async createUser(data: any): Promise<any> {
    try {
      
      return new ResponseBase(HttpStatusCode.CREATED);  
    } catch (e: unknown) {
      throw new NotFoundException(e);
    }
  }
}