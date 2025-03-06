import { IsString } from 'class-validator';

export class WordTypeDto {
  @IsString()
  type: string;
}
