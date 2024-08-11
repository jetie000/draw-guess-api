import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CommonModule } from '@app/common';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [CommonModule, PrismaModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
