import { IsArray, IsBoolean, IsInt, Max, Min } from 'class-validator';

export class CreateGameDto {
  @IsInt()
  @Max(12)
  @Min(2)
  maxPlayers: number;

  @IsInt()
  @Max(90)
  @Min(10)
  roundDuration: number;

  @IsInt()
  @Max(4)
  @Min(1)
  drawingsPerPlayer: number;

  @IsBoolean()
  isPrivate: boolean;

  @IsArray()
  wordTypeIds: number[];
}
