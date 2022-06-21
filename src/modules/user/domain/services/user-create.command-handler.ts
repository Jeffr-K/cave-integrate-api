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
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

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
      // eventBus -> EventPublisher는 NestJS CQRS 라이브러리에서 제공하며 메시징 시스템(이벤트 버스, 이벤트를 전달하는 "파이프")을 래핑합니다.
      // mergeObjectContext() -> NestJS CQRS에서는 이벤트 디스패처를 메시징 시스템에 연결하기 위해 mergeObjectContext를 사용합니다.
      // Apply() 호출을 사용하여 AggregateRoot에 연결된 DeviceCreatedEvent 이벤트가 이제 이벤트 버스에 연결되었습니다.
      // this.publisher.mergeObjectContext(aggregate); // ?
      // aggregate.register(command); // ?
      // await this eventSourcingHandler.save(aggregate) // 이벤트를 저장: 이벤트 소싱
      // aggregate.commit(); // ?
      await this.userRepository.insert(user);

      await this.eventBus.publish(new UserCreatedEvent(command.email, command.token));
      await this.eventBus.publish(new UserCreatedEvent(command.phone, command.token));
    } catch (e: unknown) {
      this.logger.error('UserCreateEventHandler/execute()', e);
    }
  }
}
