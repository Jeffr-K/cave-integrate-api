import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user/entities/user.aggregate-root.entity";
import { IUserOutBoundPort } from "src/domain/user/ports/out/user.out-bound.port";

@Injectable()
export class UserPersistanceAdapter implements IUserOutBoundPort {
  
  constructor() {}

  async createUser(): Promise<void> {}
  
  async deleteUser(): Promise<void> {}
  
  async updateUser(): Promise<void> {}
  
  async findUserById(): Promise<User> {
    return new User;
  }
}