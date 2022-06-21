import * as jwt from 'jsonwebtoken';

export const jwtHeader: jwt.JwtHeader = {
  alg: 'HS512',
  typ: 'JWT',
};

export const jwtAccessTokenOptions: jwt.SignOptions = {
  issuer: 'cave',
  subject: 'JWT TOKEN',
  expiresIn: '2h',
  header: jwtHeader,
  // encoding: "base64"
};

export const jwtRefreshTokenOptions: jwt.SignOptions = {
  issuer: 'cave',
  subject: 'JWT TOKEN',
  expiresIn: '3h',
  header: jwtHeader,
  // encoding: "base64"
};