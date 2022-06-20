import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../../application/command/update-user.command';
import { UserRepository } from '../../../../externals/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UserUpdateCommandHandler implements ICommandHandler<UpdateUserCommand> {

  constructor(@Inject(UserRepository) readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    this.userRepository.modify(command)
  }
}