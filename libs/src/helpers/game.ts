import {
  defaultPointsForGuess,
  defaultPointsGuessedForDrawer,
  extraMaxPointsForGuess,
  extraPointsGuessedForDrawer,
} from '@app/typings/enums/game';

export const MaxGameDrawings = 12;

export const calculatePoints = (roundPassedPart: number, isDrawer = false) => {
  return isDrawer
    ? defaultPointsGuessedForDrawer + Math.round(roundPassedPart * extraPointsGuessedForDrawer)
    : defaultPointsForGuess + Math.round(roundPassedPart * extraMaxPointsForGuess);
};
