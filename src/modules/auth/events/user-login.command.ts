import { IEvent } from '@nestjs/cqrs';
import { UserLoginDto } from '../application/dtos/user-login.dto';

export class UserLoginCommand implements IEvent {
  constructor(readonly email: string, readonly token: string) {}
}
