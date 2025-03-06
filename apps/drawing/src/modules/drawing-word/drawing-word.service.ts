import { Injectable } from '@nestjs/common';
import { WordDto } from './dto/word.dto';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class DrawingWordService {
  constructor(private readonly prismaService: PrismaService) {}

  addWord(word: WordDto) {
    return this.prismaService.drawingWord.create({
      data: { word: word.word, type: { connect: { id: word.typeId } } },
    });
  }

  deleteWord(id: number) {
    return this.prismaService.drawingWord.delete({ where: { id } });
  }

  updateWord(id: number, word: WordDto) {
    return this.prismaService.drawingWord.update({
      where: { id },
      data: { word: word.word, type: { connect: { id: word.typeId } } },
    });
  }

  getWords() {
    return this.prismaService.drawingWord.findMany({ include: { type: true } });
  }
}
