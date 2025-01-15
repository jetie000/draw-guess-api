import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Request } from 'express';
import { GetGameDto } from './dto/get-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @HttpCode(201)
  createGame(@Body() createGameDto: CreateGameDto, @Req() req: Request) {
    return this.gameService.createGame(createGameDto, req.user);
  }

  @Post('join')
  joinGame(@Body('code') code: string, @Req() req: Request) {
    return this.gameService.joinGame(code, req.user);
  }

  @Get('/:id')
  getGame(@Param() params: GetGameDto, @Req() req: Request) {
    return this.gameService.getGame(params.id, req.user);
  }
}
