import { UserRole } from '@app/typings/enums/account';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
export const RolesController = Reflector.createDecorator<UserRole[]>();
