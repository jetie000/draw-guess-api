import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { Request } from 'express';
import { AuthGuard } from '@app/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('achievement')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('me')
  getMyAchievements(@Req() req: Request) {
    return this.achievementsService.getMyAchievements(req.user);
  }
}
