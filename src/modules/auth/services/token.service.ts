import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Payload } from '../config/jwt.payload';
import { jwtAccessTokenOptions, jwtRefreshTokenOptions } from '../config/jwt.config';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JwtValidationError } from '../errors/jwt-validation.error';
config();

@Injectable()
export class TokenService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  async generateAccessToken(payload: Payload): Promise<string> {
    const secretKey = process.env.SECRET_KEY as string;
    return jwt.sign(payload, secretKey, jwtAccessTokenOptions);
  }

  async generateRefreshToken(payload: Payload): Promise<string> {
    const secretKey = process.env.SECRET_KEY;
    jwtRefreshTokenOptions.expiresIn = '7d';
    return jwt.sign(payload, secretKey, jwtRefreshTokenOptions);
  }

  async validate(token: string): Promise<string | any> {
    const secretKey = process.env.SECRET_KEY;
    const verified = jwt.verify(token, secretKey);
    return verified;
  }
}
