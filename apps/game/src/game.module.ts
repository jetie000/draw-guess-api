import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { RmqModule } from '@app/common/rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    PrismaModule,
    RmqModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
