import { Optional } from '@nestjs/common';
import { IsArray, IsHexColor, IsNumber } from 'class-validator';

export class AddDrawingDto {
  @IsArray()
  posX: number[];

  @IsArray()
  posY: number[];

  @IsHexColor()
  color: string;

  @IsNumber()
  lineWidth: number;

  @IsNumber()
  roundNumber: number;

  @IsNumber()
  gamePlayerId: number;

  @IsNumber()
  gameId: number;

  @IsNumber()
  @Optional()
  drawingId?: number;
}
