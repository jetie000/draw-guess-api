import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { DrawingMessageDto } from './dto/drawing-message.dto';
import { User } from '@prisma/client';
import { GamePlayerService } from 'apps/game/src/modules/game-player/game-player.service';
import { breakSecondsNumber } from '@app/typings/enums/game';
import { calculatePoints } from '@app/helpers/game';
import { getGuessedLettersFromMessages } from '@app/helpers/messages';

@Injectable()
export class DrawingMessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gamePlayerService: GamePlayerService
  ) {}

  async addDrawingMessage(drawingMessage: DrawingMessageDto, user: User) {
    const drawing = await this.prismaService.drawing.findUnique({
      where: { id: drawingMessage.drawingId },
      include: { game: { include: { players: true } }, word: true },
    });

    const gamePlayer = drawing.game.players.find(
      (player) => player.userId === user.id
    );

    if (gamePlayer.id === drawing.gamePlayerId) {
      throw new BadRequestException('You cannot guess your own drawing');
    }
    if (!drawing.game || !gamePlayer) {
      throw new BadRequestException('You are not in a game');
    }
    if (!drawing.game.startDate) {
      throw new BadRequestException('Game has not started');
    }
    if (drawing.game.endDate) {
      throw new BadRequestException('Game has ended');
    }

    const timePassed = Date.now() - drawing.game.startDate.getTime();
    if (
      timePassed % ((drawing.game.roundDuration + breakSecondsNumber) * 1000) >
      drawing.game.roundDuration * 1000
    ) {
      throw new BadRequestException('Game in break phase');
    }

    const roundPartPassed =
      (timePassed -
        (drawing.game.currentRound - 1) *
          (drawing.game.roundDuration + breakSecondsNumber) *
          1000) /
      (drawing.game.roundDuration * 1000);

    const messages = await this.prismaService.drawingMessage.findMany({
      where: {
        drawingId: drawingMessage.drawingId,
        gamePlayerId: gamePlayer.id,
      },
    });

    if (
      messages.find(
        (message) =>
          message.message.toLowerCase() === drawing.word.word.toLowerCase()
      )
    ) {
      throw new BadRequestException('You have already guessed this word');
    }

    let isGuessed = false;

    const pointsToAddGuesser = calculatePoints(roundPartPassed);
    const pointsToAddDrawer = calculatePoints(roundPartPassed, true);

    let updatedPoints: number | null = null;
    if (
      drawing.word.word.toLowerCase() === drawingMessage.message.toLowerCase()
    ) {
      isGuessed = true;
      const [guesser] = await Promise.all([
        this.gamePlayerService.addPoints(gamePlayer.id, pointsToAddGuesser),
        this.gamePlayerService.addPoints(
          drawing.gamePlayerId,
          pointsToAddDrawer
        ),
      ]);
      updatedPoints = guesser.points;
    }

    return {
      isGuessed,
      updatedPoints: updatedPoints,
      guessedLetters: drawing.game.isSimplified
        ? getGuessedLettersFromMessages(
            [
              ...messages.map((message) => message.message),
              drawingMessage.message,
            ],
            drawing.word.word
          )
        : null,
      message: await this.prismaService.drawingMessage.create({
        data: {
          message: drawingMessage.message,
          drawingId: drawingMessage.drawingId,
          sendDate: new Date(),
          gamePlayerId: gamePlayer.id,
        },
      }),
    };
  }

  async getCurrentDrawingMessages(drawingId: number, user: User) {
    const drawing = await this.prismaService.drawing.findUnique({
      where: { id: drawingId },
      include: { game: { include: { players: true } }, word: true },
    });

    const gamePlayer = drawing.game.players.find(
      (player) => player.userId === user.id
    );

    if (!drawing || !gamePlayer) {
      throw new BadRequestException('You are not in a game');
    }

    const messages = await this.prismaService.drawingMessage.findMany({
      where: { gamePlayerId: gamePlayer.id, drawingId },
    });

    return {
      isGuessed:
        messages.findIndex(
          (message) =>
            message.message.toLowerCase() === drawing.word.word.toLowerCase()
        ) !== -1,
      guessedLetters: drawing.game.isSimplified
        ? getGuessedLettersFromMessages(
            messages.map((message) => message.message),
            drawing.word.word
          )
        : null,
      messages,
    };
  }
}
