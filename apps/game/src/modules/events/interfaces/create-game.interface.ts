import { Player } from './player-join.interface';

export interface CreateGame {
  id: number;
  code: string;
  maxPlayers: number;
  roundDuration: number;
  drawingsPerPlayer: number;
  isPrivate: boolean;
  creatorId: number;
  startDate: string | null;
  endDate: string | null;
  players: Player[];
}
