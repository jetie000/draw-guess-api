import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddDrawingDto } from './dto/add-drawing.dto';
import { User } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class DrawingService {
  constructor(private readonly prismaService: PrismaService) {}

  async addDrawing(drawing: AddDrawingDto, user: User) {
    const game = await this.prismaService.game.findFirst({
      where: {
        id: drawing.gameId,
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
    if (
      drawing.roundNumber !== game.drawings.length + 1 &&
      drawing.roundNumber !== game.drawings.length
    ) {
      throw new BadRequestException('Invalid round number');
    }
    if (
      drawing.posX.length !== drawing.posY.length ||
      drawing.posX.length === 0
    ) {
      throw new BadRequestException('Invalid drawing');
    }
    if (
      user.id !==
      game.players[game.currentRound / game.drawingsPerPlayer - 1]?.user.id
    ) {
      throw new BadRequestException('Not your turn');
    }
    if (game.drawings.length === drawing.roundNumber) {
      if (!drawing.drawingId) {
        throw new BadRequestException('Invalid drawing');
      }
      return await this.prismaService.drawing.update({
        data: {
          drawingParts: {
            create: {
              posX: drawing.posX,
              posY: drawing.posY,
              color: drawing.color,
              lineWidth: drawing.lineWidth,
            },
          },
        },
        where: {
          id: drawing.drawingId,
          gameId: drawing.gameId,
          gamePlayerId: drawing.gamePlayerId,
          roundNumber: drawing.roundNumber,
        },
      });
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
    return await this.prismaService.drawing.create({
      data: {
        roundNumber: drawing.roundNumber,
        drawingParts: {
          create: {
            posX: drawing.posX,
            posY: drawing.posY,
            color: drawing.color,
            lineWidth: drawing.lineWidth,
          },
        },
        wordId: word.id,
        gameId: drawing.gameId,
        gamePlayerId: drawing.gamePlayerId,
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
        drawings: { include: { drawingParts: true } },
      },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (game.currentRound > game.drawings.length) {
      return null;
    }
    return game.drawings[game.currentRound - 1];
  }
}
