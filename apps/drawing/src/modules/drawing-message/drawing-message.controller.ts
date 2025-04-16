import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { DrawingMessageService } from './drawing-message.service';
import { Request } from 'express';
import { RmqService } from '@app';
import { isInt } from 'class-validator';
import { DrawingMessageDto } from './dto/drawing-message.dto';

@Controller('drawing-message')
export class DrawingMessageController {
  constructor(
    private readonly drawingMessageService: DrawingMessageService,
    private readonly rmqService: RmqService
  ) {}

  @Post()
  addDrawingMessage(
    @Body() drawingMessage: DrawingMessageDto,
    @Req() req: Request
  ) {
    return this.drawingMessageService.addDrawingMessage(
      drawingMessage,
      req.user
    );
  }

  @Get('drawing/:drawingId')
  getDrawingMessages(
    @Req() req: Request,
    @Param('drawingId') drawingId: string
  ) {
    const numberId = parseInt(drawingId);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.drawingMessageService.getCurrentDrawingMessages(
      numberId,
      req.user
    );
  }
}
