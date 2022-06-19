import * as jwt from 'jsonwebtoken';

export const jwtHeader: jwt.JwtHeader = {
  alg: 'HS512',
  typ: 'JWT',
};

export const jwtOptions: jwt.SignOptions = {
  issuer: 'cave',
  subject: 'JWT TOKEN',
  expiresIn: '3h',
  header: jwtHeader,
  // encoding: "base64"
};
