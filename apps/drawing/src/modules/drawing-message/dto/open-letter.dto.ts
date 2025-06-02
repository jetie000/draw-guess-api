import { IsInt } from 'class-validator';

export class OpenLetterDto {
  @IsInt()
  letterIndex: number;

  @IsInt()
  drawingId: number;
}
