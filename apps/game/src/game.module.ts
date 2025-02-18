import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app';
import { RmqModule } from '@app/rmq/rmq.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { AuthModule } from '@app/auth/auth.module';
import { GameEventsModule } from './modules/events/game-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    AuthModule,
    PrismaModule,
    RmqModule,
    GameEventsModule,
  ],
  controllers: [GameController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, GameService],
})
export class GameModule {}
