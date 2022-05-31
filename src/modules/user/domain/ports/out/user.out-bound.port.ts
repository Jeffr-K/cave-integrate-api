import { User } from "../../entities/user.entity";

export interface IUserOutBoundPort {
  register(data: any): Promise<boolean>;
  drop(id: string): Promise<boolean>;
  updateUser(data: any): Promise<boolean>;
  getUser(uniqueKey: string): Promise<User>;
  getUsers(filter?: any): Promise<User[]>;
}