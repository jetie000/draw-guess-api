import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common/auth/auth.guard';
import { AuthModule } from '@app/common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    AuthModule,
    PrismaModule,
    RmqModule,
  ],
  controllers: [GameController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, GameService],
})
export class GameModule {}
