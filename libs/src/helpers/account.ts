export const getMoneyAmountForLevelUp = (level: number) => {
  return 10 + 5 * level;
};

export const pointsForFirstLevel = 100;
export const pointsIncreasingEveryLevel = 50;

export const getLevelAndProgressByExp = (experience: number) => {
  let level = 1;
  let remainingExp = experience;
  let pointsToSubstract = pointsForFirstLevel;
  while (remainingExp >= pointsToSubstract) {
    remainingExp -= pointsToSubstract;
    level++;
    pointsToSubstract += pointsIncreasingEveryLevel;
  }

  return {
    level,
    progress: Math.floor((remainingExp / pointsToSubstract) * 100),
    pointsEarnedAtLevel: remainingExp,
    pointsForNextLevel: pointsToSubstract,
  };
};
