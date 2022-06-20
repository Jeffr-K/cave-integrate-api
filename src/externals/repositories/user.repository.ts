import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { User } from '../../modules/user/domain/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async insert(data: User) {
    return await createQueryBuilder('user')
      .insert()
      .into(User)
      .values({ ...data })
      .execute();
  }
}
