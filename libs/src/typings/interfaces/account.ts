export interface PublicUser {
  id: number;
  username: string;
  avatarUrl: string;
  experience: number;
}

export interface PublicUserWithPoints extends PublicUser {
  points: number;
}

export interface PublicUserWithWins extends PublicUser {
  wins: number;
}

export interface PublicUserWithWordsGuessed extends PublicUser {
  wordsGuessed: number;
}
