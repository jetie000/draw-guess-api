import { Body, Controller, Post, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Request } from 'express';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  createGame(@Body() createGameDto: CreateGameDto, @Req() req: Request) {
    return this.gameService.createGame(createGameDto, req.user);
  }

  @Post('join')
  joinGame(@Body('code') code: string, @Req() req: Request) {
    return this.gameService.joinGame(code, req.user);
  }
}
