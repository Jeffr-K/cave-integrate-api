import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  
  async login(data: any): Promise<boolean> {
    return true;
  }
  
  async logout() {}
  
  async googleLogin() {}
  async facebookLogin() {}
  async kakaoLogin() {}
  async naverLogin () {}
}