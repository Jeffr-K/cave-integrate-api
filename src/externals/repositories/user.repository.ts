import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../modules/user/domain/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
