import { IEvent } from '@nestjs/cqrs';

export class UserLoginCommand implements IEvent {
  constructor(readonly email: string, password: string) {}
}