import * as jwt from 'jsonwebtoken';

export const jwtHeader: jwt.JwtHeader = {
  alg: 'HS512',
  typ: 'JWT',
};

export const jwtAccessTokenOptions: jwt.SignOptions = {
  issuer: 'cave',
  subject: 'JWT TOKEN',
  expiresIn: '10m',
  header: jwtHeader,
  // encoding: "base64"
};

export const jwtRefreshTokenOptions: jwt.SignOptions = {
  issuer: 'cave',
  subject: 'JWT TOKEN',
  expiresIn: '1h',
  header: jwtHeader,
  // encoding: "base64"
};