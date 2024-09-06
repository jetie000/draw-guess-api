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
        startDate: new Date(),
        creatorId: user.id,
        players: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    return game;
  }

  async joinGame(code: string, user: User) {
    const game = await this.prismaService.game.findFirst({ where: { code } });
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const gameFound = await this.prismaService.game.findFirst({
      where: { code, players: { some: { userId: user.id } } },
      include: {
        players: {
          include: {
            user: {
              select: {
                avatarUrl: true,
                username: true,
              },
            },
          },
        },
      },
    });
    if (gameFound) {
      return gameFound;
    }

    const gameUpdated = await this.prismaService.game.update({
      where: { id: game.id },
      data: {
        players: {
          create: { userId: user.id },
        },
      },
      include: {
        players: {
          include: {
            user: {
              select: {
                avatarUrl: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return gameUpdated;
  }
}
