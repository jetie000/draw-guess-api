import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { DrawingService } from './drawing.service';
import { Request } from 'express';
import { RmqService } from '@app';
import { AddDrawingPartDto } from './dto/add-drawing-part.dto';
import { isInt } from 'class-validator';

@Controller('drawing')
export class DrawingController {
  constructor(
    private readonly drawingService: DrawingService,
    private readonly rmqService: RmqService
  ) {}

  @Post()
  addDrawingPart(@Body() drawing: AddDrawingPartDto, @Req() req: Request) {
    return this.drawingService.addDrawingPart(drawing, req.user);
  }

  @Get('game-current/:gameId')
  getDrawing(@Req() req: Request, @Param('gameId') gameId: string) {
    const numberId = parseInt(gameId);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.drawingService.getCurrentGameDrawing(numberId, req.user);
  }

  // TODO: implement rmq
  // @EventPattern('hello')
  // handleHello(@Payload() data: string, @Ctx() context: RmqContext) {
  //   this.logger.log(`data: ${data}`);
  //   this.rmqService.ack(context);
  // }
}
