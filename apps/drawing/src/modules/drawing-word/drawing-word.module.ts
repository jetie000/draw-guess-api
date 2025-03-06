import { Module } from '@nestjs/common';
import { DrawingWordController } from './drawing-word.controller';
import { DrawingWordService } from './drawing-word.service';
import { PrismaModule } from '@app';
import { GuardModule } from '@app/auth/guard.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/auth/roles.guard';

@Module({
  imports: [GuardModule, PrismaModule],
  controllers: [DrawingWordController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    DrawingWordService,
  ],
})
export class DrawingWordModule {}
