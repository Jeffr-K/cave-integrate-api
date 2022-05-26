import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
  
  async generateAccessToken() {}

  async generateRefreshToken() {}
  
  async destroyToken() {}

  
}