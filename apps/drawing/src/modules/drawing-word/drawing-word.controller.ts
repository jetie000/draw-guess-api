import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DrawingWordService } from './drawing-word.service';
import { WordDto } from './dto/word.dto';
import { isInt } from 'class-validator';
import { UserRole } from '@app/typings/enums/account';
import { Public } from '@app/auth/public.decorator';
import { Roles } from '@app/auth/roles.decorator';

@Roles([UserRole.ADMIN])
@Controller('drawing-word')
export class DrawingWordController {
  constructor(private readonly drawingWordService: DrawingWordService) {}

  @Post()
  addDrawingWord(@Body() word: WordDto) {
    return this.drawingWordService.addWord(word);
  }

  @Public()
  @Get()
  getDrawingWords() {
    return this.drawingWordService.getWords();
  }

  @Delete(':id')
  deleteDrawingWord(@Param('id') id: string) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.drawingWordService.deleteWord(numberId);
  }

  @Put(':id')
  updateDrawingWord(@Param('id') id: string, @Body() word: WordDto) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.drawingWordService.updateWord(numberId, word);
  }
}
