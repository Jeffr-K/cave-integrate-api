import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  LoggerService,
  Post,
  Put,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserCreateRequestAdapter } from '../../../../adapters/in/user.create-request.adapter';
import { ResponseBase } from '../../../../common/response.base';
import { HttpStatusCode } from '../../../../common/http.status-code';
import { UserAlreadyExistingException } from '../../errors/user.already-existing.exception';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';

@Controller('user')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private commandBus: CommandBus
  ) {}

  @Post('/')
  async create(@Body() data: UserCreateRequestAdapter): Promise<any | void> {
    console.log('진입성공', data);
    this.logger.log('UserController/create()', [{ request: data }]);
    const { username, password, email, phone, address, agreement, token } = data;
    try {
      const command = new CreateUserCommand(username, password, email, phone, address, agreement, token);
      return this.commandBus.execute(command);
    } catch (e: unknown) {
      this.logger.error('UserController/create()', [{ error: e }]);
      if (e instanceof UserAlreadyExistingException) {
        return new ResponseBase(HttpStatusCode.SERVER_ERROR, e);
      }
    }
  }

  @Put('/')
  async update(): Promise<void> {}

  @Delete('/')
  async delete(id: string): Promise<any | void> {

  }

  @Get('/')
  async findById(): Promise<void> {}
}

// const user = this.userRegisterUseCase.registerMembership(data);
// return new ResponseBase(
//   HttpStatusCode.CREATED,
//   'Successfully creating a user.'
// );
