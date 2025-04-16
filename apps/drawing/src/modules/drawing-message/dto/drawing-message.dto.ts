import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DrawingMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  drawingId: number;
}
