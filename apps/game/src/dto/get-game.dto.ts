import { IsInt } from 'class-validator';

export class GetGameDto {
  @IsInt()
  id: number;
}
