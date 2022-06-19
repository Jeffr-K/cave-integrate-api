import { Factory } from '../../../../common/factory.base';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserConcreteFactory extends Factory<User> {
  create(username: string, password: string, email: string, phone: string, address: string, agreement: boolean): User {
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.agreement = agreement;
    return user;
  }
}
