import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './application/controllers/user.controller';
import { UserCreateEventHandler } from './domain/services/user-create.event-handler';
import { UserEventsHandler } from './domain/events/user.events-handler';
import { UserConcreteFactory } from './domain/factories/user.factory';

const Providers = [
  UserCreateEventHandler,
  UserEventsHandler,
  UserConcreteFactory,
];
const Controllers = [UserController];

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [...Providers],
  exports: [],
})
export class UserModule {}
