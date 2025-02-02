import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { MaxGameDrawings } from '@app/common/helpers/game';
import { User } from '@prisma/client';
import { randomCode } from '@app/common/helpers/random';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGame(createGameDto: CreateGameDto, user: User) {
    if (
      createGameDto.maxPlayers * createGameDto.drawingsPerPlayer >
      MaxGameDrawings
    ) {
      throw new BadRequestException(
        'Too many drawings for that amount of players'
      );
    }
    let code = randomCode(6);

    while (true) {
      const gameFinded = await this.prismaService.game.findFirst({
        where: { code },
      });
      if (!gameFinded) {
        break;
      }
      code = randomCode(6);
    }

    const game = await this.prismaService.game.create({
      data: {
        ...createGameDto,
        code,
        creatorId: user.id,
        players: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    return game.id;
  }

  async joinGame(code: string, user: User) {
    const game = await this.prismaService.game.findFirst({
      where: { code: code.toLowerCase() },
      include: { players: true },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (game.players.some((player) => player.userId === user.id)) {
      return game.id;
    }

    if (game.players.length === game.maxPlayers) {
      throw new BadRequestException('Game is full');
    }

    const gameUpdated = await this.prismaService.game.update({
      where: { id: game.id },
      data: {
        players: {
          create: { userId: user.id },
        },
      },
    });

    return gameUpdated.id;
  }

  getGame(id: number, user: User) {
    const game = this.prismaService.game.findUnique({
      where: { id, players: { some: { userId: user.id } } },
      include: {
        players: {
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                username: true,
              },
            },
          },
        },
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }
}
