import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddDrawingPartDto } from './dto/add-drawing-part.dto';
import { Drawing, User } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { uniqueRandomFromArray } from '@app/helpers/random';

@Injectable()
export class DrawingService {
  constructor(private readonly prismaService: PrismaService) {}

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
        wordTypes: true,
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
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
    const words = uniqueRandomFromArray(
      gameWords.map((word) => word.id),
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

    const fullDrawing = game.drawings.find(
      (drawing) => drawing.roundNumber === game.currentRound
    );
    return fullDrawing
      ? ({
          ...fullDrawing,
          wordId: undefined,
          word:
            user.id === game.players[currentPlayerIndex].user.id
              ? fullDrawing.word
              : undefined,
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
