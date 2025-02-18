import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { MaxGameDrawings } from '@app/helpers/game';
import { User } from '@prisma/client';
import { randomCode } from '@app/helpers/random';
import { SocketService } from '@app/socket/socket.service';

@Injectable()
export class GameService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socketService: SocketService
  ) {}

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
    const gameParticipating = await this.prismaService.game.findFirst({
      where: { players: { some: { userId: user.id } } },
    });

    if (gameParticipating) {
      if (gameParticipating.code === code.toLowerCase()) {
        return gameParticipating.id;
      }
      throw new BadRequestException('You are already in another game');
    }
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

  async getGame(id: number, user: User) {
    const game = await this.prismaService.game.findUnique({
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

  async getParticipatingGames(user: User, isEnded: boolean) {
    return await this.prismaService.game.findMany({
      where: {
        players: { some: { userId: user.id } },
        endDate: isEnded ? { not: null } : null,
      },
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
  }

  async getPublicGames(user: User) {
    return await this.prismaService.game.findMany({
      where: {
        players: { none: { userId: user.id } },
        startDate: null,
        isPrivate: false,
      },
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
  }

  async deleteLeaveGame(id: number, user: User) {
    const game = await this.prismaService.game.findUnique({
      where: { id },
      include: { players: true },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (game.startDate) {
      throw new BadRequestException('Game has started');
    }
    if (game.creatorId !== user.id) {
      if (!game.players.some((player) => player.userId === user.id)) {
        throw new BadRequestException('You are not in this game');
      }
      return this.prismaService.game.update({
        where: { id },
        data: {
          players: {
            deleteMany: { userId: user.id },
          },
        },
      });
    }
    return this.prismaService.game.delete({
      where: { id },
    });
  }

  async startGame(id: number, user: User) {
    const game = await this.prismaService.game.findUnique({
      where: { id },
      include: { players: true },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (game.creatorId !== user.id) {
      throw new BadRequestException('You are not the creator of this game');
    }
    if (game.players.length < 2) {
      throw new BadRequestException('Not enough players');
    }
    if (game.startDate) {
      throw new BadRequestException('Game has already started');
    }
    const gameStarted = await this.prismaService.game.update({
      where: { id },
      data: { startDate: new Date() },
    });

    this.socketService.socket
      .to(String(game.id))
      .emit('gameStarted', gameStarted.startDate.toISOString());

    return gameStarted;
  }
}
