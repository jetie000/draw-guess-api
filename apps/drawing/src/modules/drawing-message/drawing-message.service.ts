import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { DrawingMessageDto } from './dto/drawing-message.dto';
import { User } from '@prisma/client';
import { GamePlayerService } from 'apps/game/src/modules/game-player/game-player.service';
import {
  breakSecondsNumber,
  noGuessesSecondsNumber,
} from '@app/typings/enums/game';
import { calculatePoints } from '@app/helpers/game';
import { getGuessedLettersFromMessages } from '@app/helpers/messages';
import { Prices } from '@app/typings/enums/prices';

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

    const timePassedAfterGameStart =
      Date.now() - drawing.game.startDate.getTime();
    const timePassedAfterRoundStart =
      timePassedAfterGameStart -
      (drawing.game.currentRound - 1) *
        (drawing.game.roundDuration + breakSecondsNumber) *
        1000;

    if (timePassedAfterRoundStart > drawing.game.roundDuration * 1000) {
      throw new BadRequestException('Game in break phase');
    }

    if (timePassedAfterRoundStart < noGuessesSecondsNumber * 1000) {
      throw new BadRequestException(
        `You cannot make a guess before ${noGuessesSecondsNumber} seconds of round passed`
      );
    }

    const roundPartPassed =
      timePassedAfterRoundStart / (drawing.game.roundDuration * 1000);

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
          isGuessed,
          isFirst: messages.length === 0,
          secondsPassedAfterRound: timePassedAfterRoundStart / 1000,
          message: drawingMessage.message,
          drawingId: drawingMessage.drawingId,
          sendDate: new Date(),
          gamePlayerId: gamePlayer.id,
          isLetterBought: false,
        },
      }),
    };
  }

  async openLetter(drawingId: number, user: User, letterIndex: number) {
    if (user.money < Prices.OpenLetter) {
      throw new BadRequestException('Not enough money');
    }

    const drawing = await this.prismaService.drawing.findUnique({
      where: { id: drawingId },
      include: { game: { include: { players: true } }, word: true },
    });

    const gamePlayer = drawing.game.players.find(
      (player) => player.userId === user.id
    );

    if (gamePlayer.id === drawing.gamePlayerId) {
      throw new BadRequestException('You open letter of your own drawing');
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
    if (drawing.word.word.length <= letterIndex || letterIndex < 0) {
      throw new BadRequestException('Invalid letter index');
    }

    const timePassedAfterGameStart =
      Date.now() - drawing.game.startDate.getTime();
    const timePassedAfterRoundStart =
      timePassedAfterGameStart -
      (drawing.game.currentRound - 1) *
        (drawing.game.roundDuration + breakSecondsNumber) *
        1000;

    const roundPartPassed =
      timePassedAfterRoundStart / (drawing.game.roundDuration * 1000);

    if (timePassedAfterRoundStart > drawing.game.roundDuration * 1000) {
      throw new BadRequestException('Game in break phase');
    }

    if (timePassedAfterRoundStart < noGuessesSecondsNumber * 1000) {
      throw new BadRequestException(
        `You cannot open letter before ${noGuessesSecondsNumber} seconds of round passed`
      );
    }

    const messages = await this.prismaService.drawingMessage.findMany({
      where: {
        drawingId: drawingId,
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

    if (
      messages.find(
        (message) =>
          message.message[letterIndex]?.toLowerCase() ===
          drawing.word.word[letterIndex]?.toLowerCase()
      )
    ) {
      throw new BadRequestException('You have already opened this letter');
    }

    if (messages.some((message) => message.isLetterBought)) {
      throw new BadRequestException('You have already bought a letter');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { money: { decrement: Prices.OpenLetter } },
    });

    const messageWithOpenedLetter: string[] = Array(
      drawing.word.word.length
    ).fill('_');
    messageWithOpenedLetter[letterIndex] = drawing.word.word[letterIndex];

    let isGuessed = false;

    const pointsToAddGuesser = calculatePoints(roundPartPassed);
    const pointsToAddDrawer = calculatePoints(roundPartPassed, true);

    let updatedPoints: number | null = null;

    const guessedLetters = getGuessedLettersFromMessages(
      [
        ...messages.map((message) => message.message),
        messageWithOpenedLetter.join(''),
      ],
      drawing.word.word
    );

    if (guessedLetters.every((letter) => letter !== null)) {
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
      updatedMoney: user.money - Prices.OpenLetter,
      guessedLetters: drawing.game.isSimplified ? guessedLetters : null,
      message: await this.prismaService.drawingMessage.create({
        data: {
          isGuessed,
          isFirst: messages.length === 0,
          secondsPassedAfterRound: timePassedAfterRoundStart / 1000,
          message: messageWithOpenedLetter.join(''),
          drawingId: drawingId,
          sendDate: new Date(),
          gamePlayerId: gamePlayer.id,
          isLetterBought: true,
        },
      }),
    };
  }

  async getCurrentDrawingMessages(drawingId: number, user: User) {
    const drawing = await this.prismaService.drawing.findUnique({
      where: { id: drawingId },
      include: { game: { include: { players: true } }, word: true },
    });
    if (!drawing) {
      throw new BadRequestException('Drawing not found');
    }

    const gamePlayer = drawing.game.players.find(
      (player) => player.userId === user.id
    );
    if (!gamePlayer) {
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
