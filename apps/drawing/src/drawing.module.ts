import { Module } from '@nestjs/common';
import { DrawingController } from './drawing.controller';
import { DrawingService } from './drawing.service';
import { RmqModule } from '@app/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    PrismaModule,
    RmqModule,
  ],
  controllers: [DrawingController],
  providers: [DrawingService],
})
export class DrawingModule {}
