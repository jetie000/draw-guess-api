import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DrawingMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  drawingId: number;
}
