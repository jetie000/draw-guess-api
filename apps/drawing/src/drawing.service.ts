import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddDrawingPartDto } from './dto/add-drawing-part.dto';
import { Drawing, User } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class DrawingService {
  constructor(private readonly prismaService: PrismaService) {}

  async addDrawing(gameId: number) {
    const game = await this.prismaService.game.update({
      where: {
        id: gameId,
      },
      data: {
        currentRound: { increment: 1 },
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
        wordTypes: true,
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (game.currentRound !== game.drawings.length + 1) {
      throw new BadRequestException('Unexpected game state');
    }
    const gameWordTypes = await this.prismaService.drawingWordType.findMany({
      where: {
        id: { in: game.wordTypes.map((type) => type.id) },
      },
    });
    const gameWords = await this.prismaService.drawingWord.findMany({
      where: {
        typeId: { in: gameWordTypes.map((type) => type.id) },
      },
      select: {
        id: true,
      },
    });
    const word = gameWords[Math.floor(Math.random() * gameWords.length)];

    const currentPlayerIndex =
      game.currentRound % game.players.length === 0
        ? game.players.length - 1
        : (game.currentRound % game.players.length) - 1;

    return await this.prismaService.drawing.create({
      data: {
        roundNumber: game.currentRound,
        wordId: word.id,
        gameId: gameId,
        gamePlayerId: game.players[currentPlayerIndex].id,
      },
    });
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
        },
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (game.currentRound > game.drawings.length) {
      return null;
    }

    const currentPlayerIndex =
      game.currentRound % game.players.length === 0
        ? game.players.length - 1
        : (game.currentRound % game.players.length) - 1;

    const fullDrawing = game.drawings[game.currentRound - 1];
    return {
      ...fullDrawing,
      wordId: undefined,
      word:
        user.id === game.players[currentPlayerIndex].user.id
          ? fullDrawing.word
          : undefined,
    } as Drawing;
  }
}
