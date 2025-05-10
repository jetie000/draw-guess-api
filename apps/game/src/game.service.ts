import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { MaxGameDrawings } from '@app/helpers/game';
import { Game, Prisma, User } from '@prisma/client';
import { randomCode } from '@app/helpers/random';
import { SocketService } from '@app/socket/socket.service';
import { DrawingService } from 'apps/drawing/src/drawing.service';
import { breakSecondsNumber } from '@app/typings/enums/game';
import { AchievementsService } from 'apps/account/src/modules/achievements/achievements.service';

@Injectable()
export class GameService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socketService: SocketService,
    private readonly drawingService: DrawingService,
    private readonly achievementsService: AchievementsService
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

    const gameParticipating = await this.prismaService.game.findFirst({
      where: { players: { some: { userId: user.id } }, endDate: null },
    });
    if (gameParticipating) {
      throw new BadRequestException('You are already in another game');
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
        drawingsPerPlayer: createGameDto.drawingsPerPlayer,
        maxPlayers: createGameDto.maxPlayers,
        isPrivate: createGameDto.isPrivate,
        isSimplified: createGameDto.isSimplified,
        roundDuration: createGameDto.roundDuration,
        wordTypes: {
          connect: createGameDto.wordTypeIds.map((id) => ({ id })),
        },
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
      where: { players: { some: { userId: user.id } }, endDate: null },
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
                experience: true,
              },
            },
          },
          orderBy: { id: 'asc' },
        },
        wordTypes: true,
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const drawings = game.endDate
      ? await this.prismaService.drawing.findMany({
          where: { gameId: game.id },
          include: {
            drawingParts: true,
            word: true,
          },
          orderBy: { roundNumber: 'asc' },
        })
      : null;
    return { ...game, drawings };
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
        wordTypes: true,
      },
      orderBy: { id: 'desc' },
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
        wordTypes: true,
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
      data: { startDate: new Date(), currentRound: 0 },
    });

    await this.drawingService.addDrawings(game.id);

    this.socketService.socket
      .to(String(game.id))
      .emit('gameStarted', gameStarted.startDate.toISOString());

    this.sendTime(game);

    return gameStarted;
  }

  sendTime(game: Prisma.GameGetPayload<{ include: { players: true } }>) {
    let timePassed = 0;

    const interval = setInterval(async () => {
      timePassed += 1;
      const timeToEndGame =
        (game.roundDuration + breakSecondsNumber) *
        game.drawingsPerPlayer *
        game.players.length;

      if (timePassed === timeToEndGame) {
        this.endGame(game.id);
        clearInterval(interval);
      }

      if (
        timePassed % (game.roundDuration + breakSecondsNumber) ===
        game.roundDuration
      ) {
        this.increaseRound(
          game,
          timePassed === timeToEndGame - breakSecondsNumber
        );
      }

      this.socketService.socket
        .to(String(game.id))
        .emit('timePassed', timePassed);
    }, 1000);
  }

  async increaseRound(game: Game, isLastRound: boolean) {
    await this.prismaService.game.update({
      where: { id: game.id },
      data: { currentRound: { increment: 1 } },
    });
    this.sendUpdatedPlayers(game.id, isLastRound);
  }

  async sendUpdatedPlayers(gameId: number, isLastRound: boolean) {
    const game = await this.prismaService.game.findUnique({
      where: { id: gameId },
      include: {
        players: {
          orderBy: { id: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                username: true,
                experience: true,
              },
            },
          },
        },
      },
    });
    if (isLastRound) {
      await this.prismaService.$transaction(async (prisma) => {
        game.players = await Promise.all(
          game.players.map(async (player) => {
            this.achievementsService.recalculateAchievements(
              player.user,
              gameId
            );
            await prisma.user.update({
              where: { id: player.userId },
              data: { experience: { increment: player.points } },
            });

            return {
              ...player,
              user: {
                ...player.user,
                experience: player.user.experience + player.points,
              },
            };
          })
        );
      });
    }
    this.socketService.socket
      .to(String(gameId))
      .emit('updatedPlayers', game.players);
  }

  async endGame(gameId: number) {
    const endDate = new Date();
    const game = await this.prismaService.game.update({
      data: {
        endDate,
      },
      where: { id: gameId },
      include: {
        drawings: {
          include: {
            drawingParts: true,
            word: true,
          },
          orderBy: { roundNumber: 'asc' },
        },
      },
    });
    this.socketService.socket
      .to(String(game.id))
      .emit('gameEnded', { endDate, drawings: game.drawings });
  }
}
