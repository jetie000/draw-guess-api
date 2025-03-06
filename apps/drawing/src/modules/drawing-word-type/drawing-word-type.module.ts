import { Module } from '@nestjs/common';
import { DrawingWordTypeController } from './drawing-word-type.controller';
import { DrawingWordTypeService } from './drawing-word-type.service';
import { PrismaModule } from '@app';
import { GuardModule } from '@app/auth/guard.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/auth/roles.guard';

@Module({
  imports: [GuardModule, PrismaModule],
  controllers: [DrawingWordTypeController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    DrawingWordTypeService,
  ],
})
export class DrawingWordTypeModule {}
