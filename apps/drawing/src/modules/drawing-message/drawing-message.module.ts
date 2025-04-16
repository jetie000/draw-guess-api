import { Module } from '@nestjs/common';
import { DrawingMessageController } from './drawing-message.controller';
import { DrawingMessageService } from './drawing-message.service';
import { PrismaModule } from '@app';
import { GuardModule } from '@app/auth/guard.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GamePlayerModule } from 'apps/game/src/modules/game-player/game-player.module';

@Module({
  imports: [GuardModule, PrismaModule, GamePlayerModule],
  controllers: [DrawingMessageController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    DrawingMessageService,
  ],
})
export class DrawingMessageModule {}
