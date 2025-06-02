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
import { AddDrawingPartDto } from './dto/add-drawing-part.dto';
import { isInt } from 'class-validator';

@Controller('drawing')
export class DrawingController {
  constructor(private readonly drawingService: DrawingService) {}

  @Post()
  addDrawingPart(@Body() drawing: AddDrawingPartDto, @Req() req: Request) {
    return this.drawingService.addDrawingPart(drawing, req.user);
  }

  @Post('/change-word/:gameId')
  changeDrawingWord(@Req() req: Request, @Param('gameId') gameId: string) {
    const numberId = parseInt(gameId);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.drawingService.changeDrawingWord(numberId, req.user);
  }

  @Get('game-current/:gameId')
  getDrawing(@Req() req: Request, @Param('gameId') gameId: string) {
    const numberId = parseInt(gameId);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.drawingService.getCurrentGameDrawing(numberId, req.user);
  }

  @Get('my')
  getMyDrawings(@Req() req: Request) {
    return this.drawingService.getMyDrawings(req.user);
  }
}
