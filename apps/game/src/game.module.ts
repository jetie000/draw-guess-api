import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { CommonModule } from '@app/common';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [CommonModule, PrismaModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
