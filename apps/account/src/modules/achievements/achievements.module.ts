import { Module } from '@nestjs/common';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { PrismaModule } from '@app';
import { GuardModule } from '@app/auth/guard.module';
import { SocketModule } from '@app/socket/socket.module';

@Module({
  imports: [PrismaModule, GuardModule, SocketModule],
  controllers: [AchievementsController],
  providers: [AchievementsService],
  exports: [AchievementsService],
})
export class AchievementsModule {}
