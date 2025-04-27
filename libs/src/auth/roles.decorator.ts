import { UserRole } from '@app/typings/enums/account';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserRole[]>();
