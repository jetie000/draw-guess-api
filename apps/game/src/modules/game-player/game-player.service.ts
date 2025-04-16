import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamePlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  async addPoints(gamePlayerId: number, points: number) {
    return await this.prismaService.gamePlayer.update({
      where: { id: gamePlayerId },
      data: { points: { increment: points } },
    });
  }
}
