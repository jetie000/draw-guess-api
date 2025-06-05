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
import { DrawingWordTypeService } from './drawing-word-type.service';
import { WordTypeDto } from './dto/word-type.dto';
import { isInt } from 'class-validator';
import { UserRole } from '@app/typings/enums/account';
import { Roles } from '@app/auth/roles.decorator';
import { Public } from '@app/auth/public.decorator';

@Roles(UserRole.ADMIN, UserRole.MODERATOR)
@Controller('drawing-word-type')
export class DrawingWordTypeController {
  constructor(private readonly wordTypeService: DrawingWordTypeService) {}

  @Post()
  addDrawingWordType(@Body() wordType: WordTypeDto) {
    return this.wordTypeService.addWordType(wordType);
  }

  @Public()
  @Get()
  getDrawingWordTypes() {
    return this.wordTypeService.getWordTypes();
  }

  @Delete(':id')
  deleteDrawingWordType(@Param('id') id: string) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.wordTypeService.deleteWordType(numberId);
  }

  @Put(':id')
  updateDrawingWordType(@Param('id') id: string, @Body() word: WordTypeDto) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.wordTypeService.updateWordType(numberId, word);
  }
}
