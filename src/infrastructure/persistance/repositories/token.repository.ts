import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Token } from '../../../modules/auth/entities/token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async upsertToRefreshToken(userId: number, token: string) {
    return await createQueryBuilder()
      .insert()
      .into(Token)
      .values({
        refreshToken: token,
        userId: userId
      })
      .orIgnore(true)
      .execute();
  }//

  async updateToRefreshToken(userId: number, token: string) {
    return await createQueryBuilder()
      .update(Token)
      .set({ refreshToken: token })
      .where(`token.userId = :userId`, { userId: userId })
      .execute();
  }
}