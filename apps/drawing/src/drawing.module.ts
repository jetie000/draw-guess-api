import { Module } from '@nestjs/common';
import { DrawingController } from './drawing.controller';
import { DrawingService } from './drawing.service';
import { CommonModule } from '@app/common';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [CommonModule, PrismaModule],
  controllers: [DrawingController],
  providers: [DrawingService],
})
export class DrawingModule {}
