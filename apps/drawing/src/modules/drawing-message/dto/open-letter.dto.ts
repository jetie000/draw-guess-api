import { IsNumber } from 'class-validator';

export class OpenLetterDto {
  @IsNumber()
  letterIndex: number;

  @IsNumber()
  drawingId: number;
}
