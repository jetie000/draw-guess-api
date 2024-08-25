import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from './account.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { MILLISECONDS_IN_A_DAY } from '@app/common/helpers/constants';

@Controller('user')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  async getHello() {
    return await this.accountService.getHello();
  }

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const tokens = await this.accountService.signIn(signInDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge:
        Number(
          String(this.configService.get('JWT_REFRESH_EXPIRES_IN')).slice(0, -1)
        ) * MILLISECONDS_IN_A_DAY,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { accessToken: tokens.accessToken };
  }

  @Post('signup')
  @HttpCode(204)
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.accountService.signUp(signUpDto);
  }

  @Get('request-code/:email')
  async requestCode(@Param('email') email: string) {
    return await this.accountService.requestCode(email);
  }
}
