import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddDrawingPartDto } from './dto/add-drawing-part.dto';
import { Drawing, User } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { uniqueRandomFromArray } from '@app/helpers/random';
import { breakSecondsNumber, noGuessesSecondsNumber } from '@app/typings/enums/game';
import { SocketService } from '@app/socket/socket.service';
import { Prices } from '@app/typings/enums/prices';

@Injectable()
export class DrawingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socketService: SocketService
  ) {}

  async addDrawings(gameId: number) {
    const game = await this.prismaService.game.update({
      where: {
        id: gameId,
      },
      data: {
        currentRound: 1,
      },
      include: {
        drawings: true,
        players: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        wordTypes: {
          include: {
            drawingWords: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const words = uniqueRandomFromArray(
      game.wordTypes
        .reduce((acc, wordType) => [...acc, ...wordType.drawingWords], [])
        .map((word) => word.id),
      game.players.length * game.drawingsPerPlayer
    );

    return await Promise.all(
      words.map((word, index) =>
        this.prismaService.drawing.create({
          data: {
            roundNumber: index + 1,
            wordId: word,
            gameId: gameId,
            gamePlayerId: game.players[index % game.players.length].id,
          },
        })
      )
    );
  }

  async addDrawingPart(part: AddDrawingPartDto, user: User) {
    if (part.posX.length !== part.posY.length || part.posX.length === 0) {
      throw new BadRequestException('Invalid drawing');
    }
    const game = await this.prismaService.game.findFirst({
      where: {
        id: part.gameId,
        players: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        drawings: true,
        players: {
          include: {
            user: {
              select: {
                id: true,
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
    const currentPlayerIndex =
      game.currentRound % game.players.length === 0
        ? game.players.length - 1
        : (game.currentRound % game.players.length) - 1;

    if (user.id !== game.players[currentPlayerIndex]?.user.id) {
      throw new BadRequestException('Not your turn');
    }

    return await this.prismaService.drawing.update({
      data: {
        drawingParts: {
          create: {
            posX: part.posX,
            posY: part.posY,
            color: part.color,
            lineWidth: part.lineWidth,
          },
        },
      },
      where: {
        id: part.drawingId,
        gamePlayerId: game.players[currentPlayerIndex].id,
      },
    });
  }

  async changeDrawingWord(gameId: number, user: User) {
    if (user.money < Prices.ChangeWord) {
      throw new BadRequestException('Not enough money');
    }
    const game = await this.prismaService.game.findFirst({
      where: {
        id: gameId,
        players: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        drawings: { orderBy: { roundNumber: 'asc' } },
        wordTypes: {
          include: {
            drawingWords: true,
          },
        },
        players: true,
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (
      game.drawings[game.currentRound - 1]?.gamePlayerId !==
      game.players.find((player) => player.userId === user.id)?.id
    ) {
      throw new BadRequestException('Not your turn');
    }

    const timePassedAfterGameStart = Date.now() - game.startDate.getTime();
    const timePassedAfterRoundStart =
      timePassedAfterGameStart -
      (game.currentRound - 1) * (game.roundDuration + breakSecondsNumber) * 1000;

    if (timePassedAfterRoundStart > game.roundDuration * 1000) {
      throw new BadRequestException('Game in break phase');
    }

    if (timePassedAfterRoundStart > noGuessesSecondsNumber * 1000) {
      throw new BadRequestException(
        `You cannot change word after ${noGuessesSecondsNumber} seconds of round passed`
      );
    }

    const wordId = uniqueRandomFromArray(
      game.wordTypes
        .reduce((acc, wordType) => [...acc, ...wordType.drawingWords], [])
        .filter((word) => word.id !== game.drawings[game.currentRound - 1].wordId)
        .map((word) => word.id)
    )[0];
    const [updatedUser, newDrawing] = await Promise.all([
      this.prismaService.user.update({
        data: {
          money: { decrement: Prices.ChangeWord },
        },
        where: {
          id: user.id,
        },
      }),
      this.prismaService.drawing.update({
        data: {
          wordId,
        },
        where: {
          id: game.drawings[game.currentRound - 1].id,
        },
        include: {
          word: true,
        },
      }),
    ]);

    return {
      word: newDrawing.word,
      updatedMoney: updatedUser.money,
    };
  }

  async getCurrentGameDrawing(gameId: number, user: User) {
    const game = await this.prismaService.game.findFirst({
      where: {
        id: gameId,
        players: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        drawings: {
          include: {
            drawingParts: true,
            word: true,
          },
        },
        players: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const currentPlayerIndex =
      game.currentRound % game.players.length === 0
        ? game.players.length - 1
        : (game.currentRound % game.players.length) - 1;

    const fullDrawing = game.drawings.find((drawing) => drawing.roundNumber === game.currentRound);
    return fullDrawing
      ? ({
          ...fullDrawing,
          wordId: undefined,
          word: user.id === game.players[currentPlayerIndex].user.id ? fullDrawing.word : undefined,
        } as Drawing)
      : null;
  }

  getMyDrawings(user: User) {
    return this.prismaService.drawing.findMany({
      where: { gamePlayer: { userId: user.id } },
      include: {
        drawingParts: true,
        word: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
