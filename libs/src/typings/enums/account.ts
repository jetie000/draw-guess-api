export enum AccountType {
  EMAIL = 0,
  GOOGLE = 1,
}

export enum UserRole {
  USER = 0,
  ADMIN = 1,
  MODERATOR = 2,
}

export const ROLES_KEY = 'roles-guard-key';

export enum LeaderboardTypes {
  Points = 'points',
  Wins = 'wins',
  WordsGuessed = 'words-guessed',
}
