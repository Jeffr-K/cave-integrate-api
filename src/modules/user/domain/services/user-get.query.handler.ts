import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../../application/query/get-user.query';
import { UserRepository } from '../../../../infrastructure/persistance/repositories/user.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(UserRepository) readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery) {
    const { userId } = query;
    const user = await this.userRepository.findOneById(userId);
    return user;
  }

}