import { Injectable } from '@nestjs/common';
import { WordTypeDto } from './dto/word-type.dto';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class DrawingWordTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  addWordType(wordType: WordTypeDto) {
    return this.prismaService.drawingWordType.create({
      data: { type: wordType.type, price: wordType.price },
    });
  }

  deleteWordType(id: number) {
    return this.prismaService.drawingWordType.delete({ where: { id } });
  }

  updateWordType(id: number, wordType: WordTypeDto) {
    return this.prismaService.drawingWordType.update({
      where: { id },
      data: { type: wordType.type, price: wordType.price },
    });
  }

  getWordTypes() {
    return this.prismaService.drawingWordType.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
