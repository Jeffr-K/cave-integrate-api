import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteUserCommand } from '../../application/command/delete-user.command';
import { UserRepository } from '../../../../externals/repositories/user.repository';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class UserDeleteCommandHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject(UserRepository) readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    await this.userRepository.drop(command.userId)
  }

}