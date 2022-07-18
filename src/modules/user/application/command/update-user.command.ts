import { ICommand } from '@nestjs/cqrs';
import { Address } from '../../domain/entities/address.entity';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly password: string,
    readonly email: string,
    readonly phone: string,
    readonly address: Address,
    readonly agreement: boolean,
    readonly token: string
  ) {}
}
