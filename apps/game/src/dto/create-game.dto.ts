import { IsArray, IsBoolean, IsInt, Max, Min } from 'class-validator';

export class CreateGameDto {
  @IsInt()
  @Max(12)
  @Min(2)
  maxPlayers: number;

  @IsInt()
  @Max(120)
  @Min(10)
  roundDuration: number;

  @IsInt()
  @Max(6)
  @Min(1)
  drawingsPerPlayer: number;

  @IsBoolean()
  isSimplified: boolean;

  @IsBoolean()
  isPrivate: boolean;

  @IsArray()
  wordTypeIds: number[];
}
