import { HttpStatusCode } from '../../../common/http.status-code';

export class JwtValidationError extends Error {
  private code: number;
  constructor(message) {
    super(message);
    this.code = HttpStatusCode.SERVER_ERROR;
    this.name = "JwtValidationError";
  }
}