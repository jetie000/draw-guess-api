import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountService } from './account.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { MILLISECONDS_IN_A_DAY } from '@app/common/helpers/constants';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInGoogleDto } from './dto/sign-in-google.dto';

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
  @HttpCode(200)
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

  @Post('login-google')
  @HttpCode(200)
  async signInGoogle(
    @Body() googleToken: SignInGoogleDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const tokens = await this.accountService.signInGoogle(
      googleToken.accessToken
    );
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

  @Post('sign-up')
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.accountService.signUp(signUpDto);
  }

  @Get('request-code/:email')
  async requestCode(@Param('email') email: string) {
    return await this.accountService.requestCode(email);
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.accountService.resetPassword(resetPasswordDto);
  }

  @Get('refresh-token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken = request.cookies['refreshToken'];
    const tokens = await this.accountService.refreshToken(refreshToken);

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
}
