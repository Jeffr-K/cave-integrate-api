import {
  createQueryBuilder,
  EntityManager,
  EntityRepository,
  Repository,
  Transaction,
  TransactionManager
} from 'typeorm';
import { User } from '../../../modules/user/domain/entities/user.entity';
import { IUserOutBoundPort } from '../../../modules/user/domain/ports/out/user.out-bound.port';
import { Address } from '../../../modules/user/domain/entities/address.entity';

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

  async insertAddressWithUserId(address: Address, userId: number) {
    return await createQueryBuilder()
      .insert()
      .into(Address)
      .values({
        street: address.street,
        county: address.county,
        country: address.country,
        zipcode: address.zipcode,
        userId: userId
      })
      .execute();
  }

  async register(user: User, address: Address): Promise<void> {
    await this.insert(user);
    const member = await this.findOneByEmail(user.email);
    await this.insertAddressWithUserId(address, Number(member.id));
  }
}

  // @Transaction()
  // async register(user: User, address: Address, @TransactionManager() manager?: EntityManager) {
  //   if (!manager) throw new Error();
  //
  //   await manager.createQueryBuilder()
  //     .insert()
  //     .into(User)
  //     .values({ ...user })
  //     .execute();
  //
  //   const member = await manager.createQueryBuilder()
  //     .select()
  //     .from(User, 'user')
  //     .where(`user.email = :email`, { email: user.email })
  //     .getOne();
  //
  //   await manager.createQueryBuilder()
  //     .insert()
  //     .into(Address)
  //     .values({ ...address, userId: Number(member.id) })
  //     .execute();
  //
  // }
