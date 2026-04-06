import {BcryptHashManager} from '@/core/crypto/bcrypt-hash-manager';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {validate} from '@/core/validators';
import {database} from '@/database';
import {UserSession} from '@/modules/user/user-session.dto';
import {UserRepository} from '@/modules/user/user.repository';
import {singInSchema} from '@/modules/auth/auth.dto';
import {z} from 'zod';

export async function signIn(credentials: Partial<{ email: unknown, password: unknown }>) {
  const repository = new UserRepository(database);
  const hashManager = new BcryptHashManager();
  const schema = await singInSchema();
  const payload = await validate(schema, credentials) as z.infer<typeof schema>;

  const user = await repository.oneByEmail({email: payload.email});

  if (!user) {
    throw new UnprocessablePayload({email: 'Invalid email or password'});
  }

  if (!(await hashManager.verify(payload.password, user.passwordHash))) {
    throw new UnprocessablePayload({email: 'Invalid email or password'});
  }

  return UserSession.fromUserModel(user);
}
