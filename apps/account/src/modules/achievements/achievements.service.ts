import {
  calculateAchievementLevel,
  getConsecutiveDaysPlaying,
  getMyMessagesStats,
  getTodayGames,
  getWonGamesByType,
} from '@app/helpers/achievements';
import { PrismaService } from '@app/prisma/prisma.service';
import { SocketService } from '@app/socket/socket.service';
import {
  AchievementsTypeIds,
  moneyForAchievementAmountByLevel,
} from '@app/typings/enums/achievements';
import { Injectable } from '@nestjs/common';
import { Achievement, AchievementType, Prisma, User } from '@prisma/client';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socketService: SocketService
  ) {}

  async getMyAchievements(user: User) {
    const games = await this.prismaService.game.findMany({
      where: { players: { some: { userId: user.id } } },
      include: { players: true },
      orderBy: { id: 'desc' },
    });

    const myMessages = await this.prismaService.drawingMessage.findMany({
      where: { sender: { userId: user.id }, isGuessed: true },
    });

    const messagesMyDrawingGuessed = await this.prismaService.drawingMessage.findMany({
      where: {
        isGuessed: true,
        drawing: {
          gamePlayer: {
            userId: user.id,
          },
        },
      },
    });

    return {
      achievements: await this.prismaService.achievement.findMany({
        where: { userId: user.id },
        include: {
          type: true,
        },
        orderBy: {
          type: {
            id: 'asc',
          },
        },
      }),
      progressByType: {
        ...getWonGamesByType(user, games),
        ...getTodayGames(games),
        ...getConsecutiveDaysPlaying(games),
        ...getMyMessagesStats(myMessages),
        [AchievementsTypeIds.DrawingGuesses]: messagesMyDrawingGuessed.length,
      },
    };
  }

  async createEmptyAchievements(user: Pick<User, 'id' | 'experience'>) {
    const achievementsTypes = await this.prismaService.achievementType.findMany();

    return this.prismaService.achievement.createMany({
      data: achievementsTypes.map((type) => ({
        userId: user.id,
        typeId: type.id,
        level: 0,
      })),
    });
  }

  async recalculateAchievements(user: Pick<User, 'id' | 'experience'>, gameId: number) {
    const currentAchievements = await this.prismaService.achievement.findMany({
      where: { userId: user.id },
    });

    const achievementsTypes = await this.prismaService.achievementType.findMany();

    const games = await this.prismaService.game.findMany({
      where: { players: { some: { userId: user.id } } },
      include: { players: true },
      orderBy: { id: 'desc' },
    });

    const myMessages = await this.prismaService.drawingMessage.findMany({
      where: { sender: { userId: user.id }, isGuessed: true },
    });

    const messagesMyDrawingGuessed = await this.prismaService.drawingMessage.findMany({
      where: {
        isGuessed: true,
        drawing: {
          gamePlayer: {
            userId: user.id,
          },
        },
      },
    });

    const earnedAchievements = (
      await Promise.all(
        Object.entries({
          ...getWonGamesByType(user, games),
          ...getTodayGames(games),
          ...getConsecutiveDaysPlaying(games),
          ...getMyMessagesStats(myMessages),
          [AchievementsTypeIds.DrawingGuesses]: messagesMyDrawingGuessed.length,
        }).map((value) => {
          const achievementType = achievementsTypes.find((type) => type.id === Number(value[0]));
          return this.recalculateAchievement(currentAchievements, user, value[1], achievementType);
        })
      )
    ).flat();

    if (earnedAchievements.length) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          money: {
            increment: earnedAchievements.reduce(
              (acc, achievement) => acc + moneyForAchievementAmountByLevel[achievement.level - 1],
              0
            ),
          },
        },
      });
      this.socketService.socket.to(String(gameId)).emit('achievementsEarned', {
        userId: user.id,
        achievements: earnedAchievements,
      });
    }
  }

  async recalculateAchievement(
    currentAchievements: Achievement[],
    user: Pick<User, 'id' | 'experience'>,
    amount: number,
    achievementType: AchievementType
  ) {
    const newAchievements: Prisma.AchievementGetPayload<{
      include: { type: true };
    }>[] = [];

    const achievementLevel = calculateAchievementLevel(amount, [
      achievementType.level1Amount,
      achievementType.level2Amount,
      achievementType.level3Amount,
    ]);

    const currentAchievement = currentAchievements.find(
      (achievement) => achievement.typeId === achievementType.id
    );

    if (achievementLevel > (currentAchievement?.level || 0)) {
      newAchievements.push(
        await this.prismaService.achievement.upsert({
          create: {
            userId: user.id,
            typeId: achievementType.id,
            level: achievementLevel,
          },
          update: {
            level: achievementLevel,
          },
          where: {
            id: currentAchievement?.id || -1,
          },
          include: {
            type: true,
          },
        })
      );
    }

    return newAchievements;
  }
}
