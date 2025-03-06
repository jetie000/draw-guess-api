import { IsInt, IsString } from 'class-validator';

export class WordDto {
  @IsString()
  word: string;

  @IsInt()
  typeId: number;
}
