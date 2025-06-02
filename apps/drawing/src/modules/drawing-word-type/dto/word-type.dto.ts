import { IsInt, IsPositive, IsString } from 'class-validator';

export class WordTypeDto {
  @IsString()
  type: string;

  @IsPositive()
  @IsInt()
  price: number;
}
