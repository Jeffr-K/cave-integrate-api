import { Injectable } from "@nestjs/common";
import { ResponseBase } from "src/common/response.base";
import { User } from "src/modules/user/domain/entities/user.entity";
import { IUserOutBoundPort } from "src/modules/user/domain/ports/out/user.out-bound.port";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserOutBoundPort {

  async register(data: any): Promise<boolean> {
    const result = await this.createQueryBuilder()
    .insert()
    .into(User)
    .values({ ...data })
    .execute();

    return (result) ? true: false;
  }  

  async drop(id: string): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .delete()
      .from(User)
      .where(`id = :id`, { id: id })
      .execute();

    return (result) ? true: false;
  }
  
  async dropSoftly(): Promise<void> {
    await this.createQueryBuilder()
      .softDelete();
  }
  
  async restoreSoftDeletion(): Promise<any> {
    return await this.createQueryBuilder().restore();
  }

  async updateUser(data: any): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .update(User)
      .set({ ...data })
      .where(`id = :id`, { id: data.id })
      .execute();

    return (result) ? true: false;
  }
  
  async getUser(uniqueKey: string): Promise<User> {
    return await this.createQueryBuilder()
    .select()
    .from(User, 'user')
    .where(`user.id = :uniqueKey`, { id: uniqueKey })
    .orWhere(`user.email = :uniqueKey`, { email: uniqueKey })
    .getOne();
  }

  async getUsers(filter?: any): Promise<User[]> {
    return [];
  }
}