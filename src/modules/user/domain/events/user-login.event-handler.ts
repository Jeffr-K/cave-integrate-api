import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserLoginCommand } from '../../../auth/events/user-login.command';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserRepository } from '../../../../externals/repositories/user.repository';

@Injectable()
export class UserLoginEventHandler {

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(UserRepository) readonly userRepository: UserRepository
  ) {}

  @OnEvent('login.command', { async: true })
  async handleLoginCommandEvent(event: UserLoginCommand) {
    const user = await this.userRepository.findOneByEmail(event.email);
    return user;
  }
}