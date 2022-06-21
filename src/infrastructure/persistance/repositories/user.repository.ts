import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { User } from '../../../modules/user/domain/entities/user.entity';
import { IUserOutBoundPort } from '../../../modules/user/domain/ports/out/user.out-bound.port';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserOutBoundPort{
  async insert(data: User) {
    return await createQueryBuilder('user')
      .insert()
      .into(User)
      .values({ ...data })
      .execute();
  }

  async modify(data: any) {
    return await createQueryBuilder()
      .update(User)
      .set({
        username: data.username,
        password: data.password,
        email: data.email,
        address: data.address,
        agreement: data.agreement,
        phone: data.phone
      })
      .where(`id = :id`, { id: data.id })
      .execute();
  }

  async drop(userId: number) {
    return await createQueryBuilder()
      .delete()
      .from(User, 'user')
      .where(`user.id = :id`, { id: userId })
      .execute();
  }

  async findOneById(userId: number) {
    return await createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where(`user.id = :id`, { id: userId })
      .getOneOrFail();
  }

  async findOneByEmail(email: string) {
    return await createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where(`user.email = :email`, { email: email })
      .getOne()
  }

}

