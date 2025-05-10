import {
  calculateAchievementLevel,
  getConsecutiveDaysPlaying,
  getMyMessagesStats,
  getTodayGames,
  getWonGamesByType,
} from '@app/helpers/achievements';
import { PrismaService } from '@app/prisma/prisma.service';
import { SocketService } from '@app/socket/socket.service';
import { AchievementsTypeIds } from '@app/typings/enums/achievements';
import { Injectable } from '@nestjs/common';
import { Achievement, AchievementType, Prisma, User } from '@prisma/client';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socketService: SocketService
  ) {}

  getMyAchievements(user: User) {
    return this.prismaService.achievement.findMany({
      where: { userId: user.id },
      include: {
        type: true,
      },
    });
  }

  async createEmptyAchievements(user: Pick<User, 'id' | 'experience'>) {
    const achievementsTypes =
      await this.prismaService.achievementType.findMany();

    return this.prismaService.achievement.createMany({
      data: achievementsTypes.map((type) => ({
        userId: user.id,
        typeId: type.id,
        level: 0,
      })),
    });
  }

  async recalculateAchievements(
    user: Pick<User, 'id' | 'experience'>,
    gameId: number
  ) {
    const newAchievements: Prisma.AchievementGetPayload<{
      include: { type: true };
    }>[] = [];
    const currentAchievements = await this.prismaService.achievement.findMany({
      where: { userId: user.id },
    });

    const achievementsTypes =
      await this.prismaService.achievementType.findMany();

    const games = await this.prismaService.game.findMany({
      where: { players: { some: { userId: user.id } } },
      include: { players: true },
      orderBy: { id: 'desc' },
    });

    const myMessages = await this.prismaService.drawingMessage.findMany({
      where: { sender: { userId: user.id }, isGuessed: true },
    });

    const messagesMyDrawingGuessed =
      await this.prismaService.drawingMessage.findMany({
        where: {
          isGuessed: true,
          drawing: {
            gamePlayer: {
              userId: user.id,
            },
          },
        },
      });

    await Promise.all([
      Object.entries({
        ...getWonGamesByType(user, games),
        ...getTodayGames(games),
        ...getConsecutiveDaysPlaying(games),
        ...getMyMessagesStats(myMessages),
        [AchievementsTypeIds.DrawingGuesses]: messagesMyDrawingGuessed.length,
      }).map((value) => {
        const achievementType = achievementsTypes.find(
          (type) => type.id === Number(value[0])
        );
        return this.recalculateAchievement(
          newAchievements,
          currentAchievements,
          user,
          value[1],
          achievementType
        );
      }),
    ]);

    if (newAchievements.length) {
      this.socketService.socket.to(String(gameId)).emit('achievementsEarned', {
        userId: user.id,
        achievements: newAchievements,
      });
    }
  }

  async recalculateAchievement(
    newAchievements: Achievement[],
    currentAchievements: Achievement[],
    user: Pick<User, 'id' | 'experience'>,
    amount: number,
    achievementType: AchievementType
  ) {
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
  }
}
