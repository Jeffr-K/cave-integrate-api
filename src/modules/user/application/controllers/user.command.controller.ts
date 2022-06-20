import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  LoggerService, NotFoundException, Param,
  Post,
  Put, UseGuards
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserCreateRequestAdapter } from '../../../../adapters/in/user.create-request.adapter';
import { ResponseBase } from '../../../../common/response.base';
import { HttpStatusCode } from '../../../../common/http.status-code';
import { UserAlreadyExistingException } from '../../errors/user.already-existing.exception';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';
import { AuthGuards } from '../../../auth/guards/auth.guards';
import { UserUpdateRequestAdapter } from '../../../../adapters/in/user.update-request.adapter';
import { UpdateUserCommand } from '../command/update-user.command';
import { DeleteUserCommand } from '../command/delete-user.command';

@Controller('user')
export class UserCommandController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private commandBus: CommandBus
  ) {}

  @Post('/')
  async create(@Body() data: UserCreateRequestAdapter): Promise<any | void> {
    this.logger.log('UserCommandController/create()', [{ request: data }]);
    try {
      const { username, password, email, phone, address, agreement, token } = data;
      const command = new CreateUserCommand(username, password, email, phone, address, agreement, token);
      await this.commandBus.execute(command);
    } catch (e: unknown) {
      this.logger.error('UserCommandController/create()', [{ error: e }]);
      if (e instanceof UserAlreadyExistingException) {
        return new ResponseBase(HttpStatusCode.SERVER_ERROR, e);
      }
    }
  }

  // @UseGuards(AuthGuards)
  @Put('/')
  async update(@Body() data: UserUpdateRequestAdapter): Promise<any | void> {
    try {
      const { id, username, password, email, phone, address, agreement, token } = data;
      const command = new UpdateUserCommand(id, username, password, email, phone, address, agreement, token);
      await this.commandBus.execute(command);
    } catch (e) {
      this.logger.error('UserCommandController/update()', [{ error: e }]);
      console.log(e);
      // if (e instanceof NotFoundException) {
      //   return new ResponseBase(HttpStatusCode.NOT_FOUNDED, e);
      // }
    }
  }

  @Delete('/:id')
  async delete(@Param('id') userId: number): Promise<any | void> {
    try {
      const command = new DeleteUserCommand(userId);
      await this.commandBus.execute(command);
    } catch (e) {
      console.log('Console Logs: ', e);
      this.logger.debug("UserCommandController/delete()", e);
    }
  }

}

// const user = this.userRegisterUseCase.registerMembership(data);
// return new ResponseBase(
//   HttpStatusCode.CREATED,
//   'Successfully creating a user.'
// );
