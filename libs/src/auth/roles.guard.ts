import { ROLES_KEY, UserRole } from '@app/typings/enums/account';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const requiredRolesController = this.reflector.get(
      Roles,
      context.getClass()
    );
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    const allRequiredRoles = [
      ...(requiredRolesController || []),
      ...(requiredRoles || []),
    ];

    if (!allRequiredRoles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const isProperRole = allRequiredRoles.some((role) => user.role === role);
    if (!isProperRole) {
      throw new ForbiddenException();
    }
    return true;
  }
}
