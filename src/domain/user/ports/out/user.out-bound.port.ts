import { User } from "../../entities/user.aggregate-root.entity";

export interface IUserOutBoundPort {
  createUser(): Promise<void>;
  deleteUser(): Promise<void>;
  updateUser(): Promise<void>;
  findUserById(): Promise<User>;
}