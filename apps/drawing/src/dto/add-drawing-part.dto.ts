import { IsArray, IsHexColor, IsInt, IsNumber } from 'class-validator';

export class AddDrawingPartDto {
  @IsArray()
  posX: number[];

  @IsArray()
  posY: number[];

  @IsHexColor()
  color: string;

  @IsNumber()
  lineWidth: number;

  @IsInt()
  gameId: number;

  @IsInt()
  drawingId: number;
}
