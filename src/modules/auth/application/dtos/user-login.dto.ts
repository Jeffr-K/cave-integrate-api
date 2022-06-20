import { IsNumber, IsOptional, IsString } from "class-validator";
import { UserLoginRequestAdapter } from '../../../../adapters/in/user.login-request.adapter';


export class UserLoginDto implements UserLoginRequestAdapter {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

}