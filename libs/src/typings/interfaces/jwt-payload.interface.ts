import { AccountType } from '../enums/account';

export interface JwtPayload {
  email: string;
  username: string;
  type: AccountType;
}
