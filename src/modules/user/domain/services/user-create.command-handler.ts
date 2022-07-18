import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/command/create-user.command';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { UserCreatedEvent } from '../events/event/user-created.event';
import { UserRepository } from '../../../../infrastructure/persistance/repositories/user.repository';
import * as bcrypt from 'bcryptjs'; // commonJS 에는 default 가 없음
import { UserConcreteFactory } from '../factories/user.factory';
import { User } from '../entities/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EmailService } from '../../../mail/email.service';
import { Address } from '../entities/address.entity';
import { AddressConcreteFactory } from '../factories/address.factory';

//https://starplatina.tistory.com/419
// 휴대폰 인증
// https://jaenjoy.tistory.com/13
// 여기로 번호가 왔다는 것은, 인증된 휴대폰이다 라는 것을 보장해야 함.

@Injectable()
@CommandHandler(CreateUserCommand)
export class UserCreateCommandHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    @Inject(EventBus) private readonly eventBus: EventBus,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(UserRepository) readonly userRepository: UserRepository,
    @Inject(UserConcreteFactory) readonly userConcreteFactory: UserConcreteFactory,
    @Inject(AddressConcreteFactory) readonly addressConcreteFactory: AddressConcreteFactory,
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    try {
      const { username, password, email, phone, agreement, address } = command;
      console.log("핸들러까지 오나", address);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // const location: Address = await this.addressConcreteFactory.create();
      const user: User = await this.userConcreteFactory.create(
        username,
        hashedPassword,
        email,
        phone,
        agreement
      );
      // await this.userRepository.insert(user);
      // const getUser = await this.userRepository.findOneByEmail(email);
      await this.userRepository.register(user, address);

      await this.eventBus.publish(new UserCreatedEvent(command.email, command.token));
      await this.eventBus.publish(new UserCreatedEvent(command.phone, command.token));
    } catch (e: unknown) {
      console.log(e);
      this.logger.error('UserCreateEventHandler/execute()', e);
    }
  }
}
