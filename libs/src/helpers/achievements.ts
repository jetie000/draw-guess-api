import { DrawingMessage, Prisma, User } from '@prisma/client';
import { MILLISECONDS_IN_A_DAY } from './constants';
import {
  AchievementsTypeIds,
  QuickGuessSeconds,
} from '@app/typings/enums/achievements';

export const calculateAchievementLevel = (
  amount: number,
  levelAmounts: number[]
) => {
  for (let i = 0; i < levelAmounts.length; i++) {
    if (amount < levelAmounts[i]) {
      return i;
    }
  }
  return levelAmounts.length;
};

export const getWonGamesByType = (
  user: Pick<User, 'id' | 'experience'>,
  games: Prisma.GameGetPayload<{
    include: { players: true };
  }>[]
) => {
  const gamesWon = games.filter((game) => {
    const playersSorted = game.players
      .slice()
      .sort((p1, p2) => p2.points - p1.points);

    const yourPlayer = playersSorted.find((p) => p.userId === user.id);
    if (!yourPlayer || yourPlayer.points === 0) {
      return false;
    }
    return yourPlayer?.points === playersSorted[0].points;
  });

  const gamesWonByType = gamesWon.reduce(
    (acc, game) => ({
      standart: acc.standart + (!game.isSimplified ? 1 : 0),
      simplified: acc.simplified + (game.isSimplified ? 1 : 0),
    }),
    { standart: 0, simplified: 0 }
  );

  return {
    [AchievementsTypeIds.StandartWins]: gamesWonByType.standart,
    [AchievementsTypeIds.SimplifiedWins]: gamesWonByType.simplified,
  };
};

export const getTodayGames = (
  games: Prisma.GameGetPayload<{
    include: { players: true };
  }>[]
) => ({
  [AchievementsTypeIds.DailyGames]: games.filter(
    (game) => game.startDate >= new Date(new Date().setHours(0, 0, 0, 0))
  ).length,
});

export const getConsecutiveDaysPlaying = (
  games: Prisma.GameGetPayload<{
    include: { players: true };
  }>[]
) => {
  let consecutiveDaysPlaying = 1;
  for (let i = 1; i < games.length; i++) {
    if (
      new Date(games[i - 1].startDate).setHours(0, 0, 0, 0) -
        new Date(games[i].startDate).setHours(0, 0, 0, 0) ===
      MILLISECONDS_IN_A_DAY
    ) {
      consecutiveDaysPlaying += 1;
    } else {
      break;
    }
  }
  return {
    [AchievementsTypeIds.ConsecutiveDaysPlaying]: consecutiveDaysPlaying,
  };
};

export const getMyMessagesStats = (drawingMessages: DrawingMessage[]) => {
  return {
    [AchievementsTypeIds.WordsGuessed]: drawingMessages.length,
    [AchievementsTypeIds.FirstTryGuesses]: drawingMessages.filter(
      (message) => message.isFirst
    ).length,
    [AchievementsTypeIds.QuickQuesses]: drawingMessages.filter(
      (message) => message.secondsPassedAfterRound <= QuickGuessSeconds
    ).length,
  };
};
