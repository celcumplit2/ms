import {SelectUser} from '@/modules/user/user.model';

export interface IUserSession {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

type UserSessionPayload = IUserSession;

export class UserSession implements IUserSession {
  readonly id: string;
  readonly email: string;
  readonly role: string;
  readonly permissions: string[];

  constructor(
    {
      id,
      email,
      role,
      permissions,
    }: UserSessionPayload,
  ) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.permissions = permissions;
  }

  static fromUserModel(user: SelectUser): UserSession {
    return new UserSession({
      id: String(user.id),
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  }
}
