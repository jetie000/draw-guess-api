// import { Module } from '@nestjs/common';
// import { DrawingMessageController } from './drawing-message.controller';
// import { DrawingMessageService } from './drawing-message.service';
// import { PrismaModule } from '@app';
// import { AuthModule } from '@app/auth/auth.module';
// import { AuthGuard } from '@app/auth/auth.guard';
// import { APP_GUARD } from '@nestjs/core';

// @Module({
//   imports: [AuthModule, PrismaModule],
//   controllers: [DrawingMessageController],
//   providers: [
//     { provide: APP_GUARD, useClass: AuthGuard },
//     DrawingMessageService,
//   ],
// })
// export class DrawingModule {}
