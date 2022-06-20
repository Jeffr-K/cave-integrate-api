import { Injectable } from '@nestjs/common';
import { Payload } from '../config/jwt.payload';
import { jwtAccessTokenOptions, jwtRefreshTokenOptions } from '../config/jwt.config';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Injectable()
export class TokenService {
  constructor() {}

  async generateAccessToken(payload: Payload): Promise<string> {
    const secretKey = process.env.SECRET_KEY as string;
    return jwt.sign(payload, secretKey, jwtAccessTokenOptions);
  }

  async generateRefreshToken(payload: Payload): Promise<string> {
    const secretKey = process.env.SECRET_KEY;
    jwtRefreshTokenOptions.expiresIn = '7d';
    return jwt.sign(payload, secretKey, jwtRefreshTokenOptions);
  }

  async validate(token: string): Promise<boolean> {
    const secretKey = process.env.SECRET_KEY;
    let result;

    await jwt.verify(token, secretKey, { complete: true }, (error, decode) => {
      if (error || !decode) {
        throw new jwt.JsonWebTokenError('Cannot validate this token because of some reason.', error);
      }
      result = true;
    });
    return result;
  }
}
