import { HttpStatusCode } from '../../../common/http.status-code';

export class PasswordVerifyError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "PasswordVerifyError";
    this.statusCode = HttpStatusCode.BAD_REQUEST
  }
}