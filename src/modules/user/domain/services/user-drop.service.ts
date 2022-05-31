import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpStatusCode } from "src/common/http.status-code";
import { ResponseBase } from "src/common/response.base";

@Injectable()
export class UserDropService {
  
  constructor() {}

  async drop(id: string): Promise<any> {
    try {

      return new ResponseBase(HttpStatusCode.ACCEPTED);  
    } catch (e: unknown) {
      throw new NotFoundException(e);
    }
  }
}