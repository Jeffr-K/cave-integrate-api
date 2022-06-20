import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/command/create-user.command';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserRepository } from '../../../../externals/repositories/user.repository';
import * as bcrypt from 'bcryptjs'; // commonJS 에는 default 가 없음
import { UserConcreteFactory } from '../factories/user.factory';
import { User } from '../entities/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

//https://starplatina.tistory.com/419
// 휴대폰 인증
// https://jaenjoy.tistory.com/13
// 여기로 번호가 왔다는 것은, 인증된 휴대폰이다 라는 것을 보장해야 함.

@Injectable()
@CommandHandler(CreateUserCommand)
export class UserCreateEventHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    readonly eventBus: EventBus,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(UserRepository) readonly userRepository: UserRepository,
    @Inject(UserConcreteFactory) readonly userConcreteFactory: UserConcreteFactory
  ) {}

  // TODO: Require Test
  async execute(command: CreateUserCommand): Promise<void> {
    try {
      const { username, password, email, phone, address, agreement } = command;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user: User = await this.userConcreteFactory.create(
        username,
        hashedPassword,
        email,
        phone,
        address,
        agreement
      );

      await this.userRepository.insert(user);

      await this.eventBus.publish(new UserCreatedEvent(command.email, command.token));
      await this.eventBus.publish(new UserCreatedEvent(command.phone, command.token));
    } catch (e: unknown) {
      this.logger.error('UserCreateEventHandler/execute()', e);
    }
  }
}
