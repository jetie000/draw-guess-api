// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   Post,
//   Query,
//   Req,
// } from '@nestjs/common';
// import { DrawingMessageService } from './drawing-message.service';
// import { Request } from 'express';
// import { RmqService } from '@app';
// import { AddDrawingMessageDto } from './dto/add-drawing-message.dto';
// import { isInt } from 'class-validator';

// @Controller('drawing-message')
// export class DrawingController {
//   constructor(
//     private readonly drawingService: DrawingMessageService,
//     private readonly rmqService: RmqService
//   ) {}

//   @Post()
//   addDrawingMessage(
//     @Body() drawingMessage: AddDrawingMessageDto,
//     @Req() req: Request
//   ) {
//     return this.drawingService.addDrawing(drawingMessage, req.user);
//   }

//   @Get('gameCurrent/:gameId')
//   getDrawingMessages(@Req() req: Request, @Query('gameId') gameId: string) {
//     const numberId = parseInt(gameId);
//     if (isInt(numberId) === false) {
//       throw new BadRequestException('Invalid id');
//     }
//     return this.drawingService.getCurrentGameDrawingMessages(
//       numberId,
//       req.user
//     );
//   }
// }
