import { Module } from '@nestjs/common';
import { GamePlayerService } from './game-player.service';
import { PrismaModule } from '@app';

@Module({
  imports: [PrismaModule],
  providers: [GamePlayerService],
  exports: [GamePlayerService],
})
export class GamePlayerModule {}
