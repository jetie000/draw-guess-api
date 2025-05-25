import { ROLES_KEY, UserRole } from '@app/typings/enums/account';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
