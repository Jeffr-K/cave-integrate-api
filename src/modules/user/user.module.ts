import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCommandController } from './application/controllers/user.command.controller';
import { UserCreateCommandHandler } from './domain/services/user-create.command-handler';
import { UserEventsHandler } from './domain/events/handler/user.events-handler';
import { UserConcreteFactory } from './domain/factories/user.factory';
import { UserRepository } from '../../infrastructure/persistance/repositories/user.repository';
import { MailModule } from '../mail/mail.module';
import { AuthGuards } from '../auth/guards/auth.guards';
import { AuthModule } from '../auth/auth.module';
import { UserQueryController } from './application/controllers/user.query.controller';
import { GetUserQueryHandler } from './domain/services/user-get.query.handler';
import { UserUpdateCommandHandler } from './domain/services/user-update.command-handler';
import { UserDeleteCommandHandler } from './domain/services/user-delete.command-handler';
import { UserLoginEventHandler } from './domain/events/handler/user-login.event-handler';

const Providers = [
  UserCreateCommandHandler,
  UserUpdateCommandHandler,
  UserDeleteCommandHandler,
  UserLoginEventHandler,
  GetUserQueryHandler,
  UserConcreteFactory,
  UserRepository,
  UserEventsHandler,
  AuthGuards
];
const Controllers = [UserCommandController, UserQueryController];

@Module({
  imports: [CqrsModule, MailModule, forwardRef(() => AuthModule)],
  controllers: [...Controllers],
  providers: [...Providers],
  exports: [UserRepository],
})
export class UserModule {}
