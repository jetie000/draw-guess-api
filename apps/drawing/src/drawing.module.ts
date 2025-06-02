import { Module } from '@nestjs/common';
import { DrawingController } from './drawing.controller';
import { DrawingService } from './drawing.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app';
import { GuardModule } from '@app/auth/guard.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DrawingWordModule } from './modules/drawing-word/drawing-word.module';
import { DrawingWordTypeModule } from './modules/drawing-word-type/drawing-word-type.module';
import { DrawingMessageModule } from './modules/drawing-message/drawing-message.module';
import { SocketModule } from '@app/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    GuardModule,
    PrismaModule,
    SocketModule,
    DrawingWordModule,
    DrawingWordTypeModule,
    DrawingMessageModule,
  ],
  controllers: [DrawingController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, DrawingService],
  exports: [DrawingService],
})
export class DrawingModule {}
