import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountService } from './account.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { MILLISECONDS_IN_A_DAY } from '@app/helpers/constants';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInGoogleDto } from './dto/sign-in-google.dto';
import { AuthGuard } from '@app/auth/auth.guard';
import { UserRole } from '@app/typings/enums/account';
import { Roles } from '@app/auth/roles.decorator';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/update-user.dto';
import { isInt } from 'class-validator';
import { RolesGuard } from '@app/auth/roles.guard';

@Controller('user')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly configService: ConfigService
  ) {}

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

  @Post('logout')
  @HttpCode(204)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');
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

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request: Request) {
    return {
      id: request.user.id,
      email: request.user.email,
      username: request.user.username,
      joinDate: request.user.joinDate,
      loginDate: request.user.loginDate,
      avatarUrl: request.user.avatarUrl,
      role: request.user.role,
      type: request.user.type,
      access: request.user.access,
      experience: request.user.experience,
    };
  }

  @Get('all')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAll() {
    return this.accountService.getAll();
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async patchUser(
    @Req() request: Request,
    @Body() patchUserDto: UpdateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const tokens = await this.accountService.patchUser(request.user.id, {
      username: patchUserDto.username,
    });
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

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  patchUserAdmin(
    @Param('id') id: string,
    @Body() patchUserDto: UpdateUserAdminDto
  ) {
    const numberId = parseInt(id);
    if (isInt(numberId) === false) {
      throw new BadRequestException('Invalid id');
    }
    return this.accountService.patchUserAdmin(numberId, patchUserDto);
  }
}
