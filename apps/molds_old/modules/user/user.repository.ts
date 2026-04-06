import {CustomRepository} from '@/core/repositories/custom-repository';
import {SelectUser, user} from '@/modules/user/user.model';
import {eq} from 'drizzle-orm';

export class UserRepository extends CustomRepository {
  async existsByEmail({email}: { email: string }): Promise<boolean> {
    return await this.database.$count(user, eq(user.email, email)) > 0;
  }

  async oneByEmail({email}: { email: string }): Promise<SelectUser | undefined> {
    return this.database
      .query
      .user
      .findFirst({
        where: eq(user.email, email),
      });
  }
}
