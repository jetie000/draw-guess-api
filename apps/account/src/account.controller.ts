import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('user')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getHello() {
    return await this.accountService.getHello();
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.accountService.signIn(signInDto);
  }
}
