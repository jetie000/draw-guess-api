import { IsArray, IsHexColor, IsNumber } from 'class-validator';

export class AddDrawingPartDto {
  @IsArray()
  posX: number[];

  @IsArray()
  posY: number[];

  @IsHexColor()
  color: string;

  @IsNumber()
  lineWidth: number;

  @IsNumber()
  gameId: number;

  @IsNumber()
  drawingId: number;
}
