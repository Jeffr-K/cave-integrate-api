import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/command/create-user.command';
import { Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserRepository } from '../../../../externals/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { UserConcreteFactory } from '../factories/user.factory';

//https://starplatina.tistory.com/419
// 휴대폰 인증
// https://jaenjoy.tistory.com/13
// 여기로 번호가 왔다는 것은, 인증된 휴대폰이다 라는 것을 보장해야 함.

@Injectable()
@CommandHandler(CreateUserCommand)
export class UserCreateEventHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    @Inject(EventBus) readonly eventBus: EventBus,
    @Inject(UserRepository) readonly userRepository: UserRepository,
    @Inject(UserConcreteFactory) readonly userConcreteFactory: UserConcreteFactory
  ) {}

  // TODO: Require Test
  async execute(command: CreateUserCommand): Promise<any> {
    const { username, password, email, phone, address, agreement } = command;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userConcreteFactory.create(username, hashedPassword, email, phone, address, agreement)
    await this.userRepository.save(user);

    // 이메일 발송
    await this.eventBus.publish(new UserCreatedEvent(command.email, command.token));
    await this.eventBus.publish(new UserCreatedEvent(command.phone, command.token));
    // 휴대폰 푸쉬알림

    return Promise.resolve(undefined);

  }
}
