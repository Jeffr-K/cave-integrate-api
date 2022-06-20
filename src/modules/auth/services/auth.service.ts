import { Body, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserLoginCommand } from '../events/user-login.command';
import { UserLoginDto } from '../application/dtos/user-login.dto';

@Injectable()
export class AuthService {

  constructor(private eventEmitter: EventEmitter2) {}

  async login(@Body() data: UserLoginDto): Promise<boolean> {
    this.eventEmitter.emit('login.command', new UserLoginCommand(data.email, data.password));
    return true;
  }

  async logout() {}

  async verify(jwt: string): Promise<boolean> {
    return true;
  }

}
