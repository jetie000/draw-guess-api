export interface Player {
  id: number;
  points: number;
  user: {
    id: number;
    avatarUrl?: string;
    username: string;
  };
}
