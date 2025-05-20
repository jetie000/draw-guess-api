import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { GuardModule } from '@app/auth/guard.module';
import { GameEventsModule } from './modules/events/game-events.module';
import { DrawingService } from 'apps/drawing/src/drawing.service';
import { AchievementsService } from 'apps/account/src/modules/achievements/achievements.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    GuardModule,
    PrismaModule,
    GameEventsModule,
  ],
  controllers: [GameController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    GameService,
    DrawingService,
    AchievementsService,
  ],
})
export class GameModule {}
