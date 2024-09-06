import { IsNumber, Max, Min } from 'class-validator';

export class CreateGameDto {
  @IsNumber()
  @Max(12)
  @Min(2)
  maxPlayers: number;

  @IsNumber()
  @Max(90)
  @Min(10)
  roundDuration: number;

  @IsNumber()
  @Max(4)
  @Min(1)
  drawingsPerPlayer: number;
}
