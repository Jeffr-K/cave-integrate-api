import { HttpStatusCode } from '../../../common/http.status-code';

export class LoginFailedError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.name = "LoginFailedError";
    this.code = HttpStatusCode.SERVER_ERROR;
  }
}