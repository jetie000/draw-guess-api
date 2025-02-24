import { Module } from '@nestjs/common';
import { DrawingController } from './drawing.controller';
import { DrawingService } from './drawing.service';
import { RmqModule } from '@app/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app';
import { AuthModule } from '@app/auth/auth.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

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
  controllers: [DrawingController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, DrawingService],
})
export class DrawingModule {}
