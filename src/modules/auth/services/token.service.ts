import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";

import { UserLoginRequestAdapter } from "src/adapters/in/user.login-request.adapter";
import { jwtOptions } from "./jwt.config";
import { config } from "dotenv";
import { Payload } from "./jwt.payload";

config();

@Injectable()
export class TokenService {

  private secretKey: jwt.Secret;

  constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }
  
  async generateAccessToken(payload: Payload): Promise<string> {
    let accessToken: string;

    await jwt.sign(payload, this.secretKey, jwtOptions, (error, token) => {
      if (error) {
        throw new jwt.JsonWebTokenError("Cannot make access json web token.", error);
      }
      accessToken = token;
      return; 
    });
    return accessToken;
  }

  async generateRefreshToken(payload: Payload): Promise<string> {
    let refreshToken: string;
    jwtOptions.expiresIn = '7d';
    
    await jwt.sign(payload, this.secretKey, jwtOptions, (error, token) => {
      if (error) {
        throw new jwt.JsonWebTokenError("Cannot make refresh json web token.", error);
      }
      refreshToken = token;
      return; 
    });
    return refreshToken;
  }

  async validate(token: string): Promise<boolean> {
    let result;
    
    await jwt.verify(token, this.secretKey, { complete: true}, (error, decode) => {
      if (error || !decode) {
        throw new jwt.JsonWebTokenError("Cannot validate this token because of some reason.", error);
      }
      result = true;
    });
    return result;
  }
  
}