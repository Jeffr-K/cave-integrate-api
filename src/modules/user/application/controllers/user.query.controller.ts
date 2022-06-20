import { Controller, Get, Inject, LoggerService, Param } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../query/get-user.query';
import { User } from '../../domain/entities/user.entity';

@Controller('users')
export class UserQueryController {

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private queryBus: QueryBus
  ) {}

  @Get(':id')
  async getUserById(@Param('id') userId: number) {
    try {
      const query = new GetUserQuery(userId);
      return this.queryBus.execute(query);
    } catch (e) {
      this.logger.error('UserQueryController/getUserBy()', e)
    }
  }

  @Get()
  async getUsers(): Promise<User[]> {
    try {
      return [new User()];
    } catch (e) {

    }
  }

}