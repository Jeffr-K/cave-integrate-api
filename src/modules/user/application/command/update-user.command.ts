import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly password: string,
    readonly email: string,
    readonly address: string,
    readonly phone: string,
    readonly agreement: boolean,
    readonly token: string
  ) {}
}
