import { User } from '../../entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Address } from '../../entities/address.entity';

export interface IUserOutBoundPort {
  insert(data: User): Promise<InsertResult>;
  modify(data: any): Promise<UpdateResult>;
  drop(userId: number): Promise<DeleteResult>;
  findOneById(userId: number): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  register(user: User, address: Address): Promise<void>;
}
