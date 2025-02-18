import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Request } from 'express';
import { isInt } from 'class-validator';

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

  @Get('participating')
  getParticipatingGames(
    @Req() req: Request,
    @Query('isEnded') isEnded: string = 'false'
  ) {
    return this.gameService.getParticipatingGames(req.user, isEnded === 'true');
  }

  @Get('public')
  getPublicGames(@Req() req: Request) {
    return this.gameService.getPublicGames(req.user);
  }

  @Get(':id')
  getGame(@Param('id') id: string, @Req() req: Request) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.gameService.getGame(numberId, req.user);
  }

  @Delete(':id')
  deleteLeaveGame(@Param('id') id: string, @Req() req: Request) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.gameService.deleteLeaveGame(numberId, req.user);
  }

  @Post(':id/start')
  startGame(@Param('id') id: string, @Req() req: Request) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.gameService.startGame(numberId, req.user);
  }
}
