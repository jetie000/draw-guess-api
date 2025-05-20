import path from 'path';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { compare, hash } from 'bcrypt';
import { randomNumCode } from '@app/helpers/random';
import { MailerService } from '@nestjs-modules/mailer';
import { CODE_LENGTH } from '@app/helpers/constants';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleService } from './modules/google/google.service';
import { JwtPayload } from '@app/typings/interfaces/jwt-payload.interface';
import { AccountType, UserRole } from '@app/typings/enums/account';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/update-user.dto';
import { AchievementsService } from './modules/achievements/achievements.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly googleService: GoogleService,
    private readonly achievementsService: AchievementsService
  ) {}

  async generateTokens(payload: JwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      }),
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: signInDto.email,
        type: AccountType.EMAIL,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.access) {
      throw new ForbiddenException('User is blocked');
    }

    const isEqualPasswords = await compare(signInDto.password, user.password);
    if (!isEqualPasswords) {
      throw new UnauthorizedException('Wrong password');
    }

    const tokens = await this.generateTokens({
      username: user.username,
      email: user.email,
      type: AccountType.EMAIL,
    });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        loginDate: new Date(),
        refreshToken: tokens.refreshToken,
      },
    });

    return tokens;
  }

  async signInGoogle(googleToken: string) {
    const googleInfo = await this.googleService.verifyCode(googleToken);
    const tokens = await this.generateTokens({
      username: googleInfo.name,
      email: googleInfo.email,
      type: AccountType.GOOGLE,
    });
    const hashedPassword = await hash(
      googleInfo.sub,
      this.configService.get('HASH_SALT')
    );

    const userTofind = await this.prismaService.user.findFirst({
      where: {
        email: googleInfo.email,
      },
    });

    if (!userTofind) {
      const userCreated = await this.prismaService.user.create({
        data: {
          email: googleInfo.email,
          username: googleInfo.name,
          password: hashedPassword,
          joinDate: new Date(),
          loginDate: new Date(),
          refreshToken: tokens.refreshToken,
          access: true,
          avatarUrl: googleInfo.picture,
          role: UserRole.USER,
          type: AccountType.GOOGLE,
        },
      });
      await this.achievementsService.createEmptyAchievements(userCreated);

      return tokens;
    } else {
      if (userTofind.type !== AccountType.GOOGLE) {
        throw new ConflictException('User is registered without google');
      }
      if (userTofind.access === false) {
        throw new ForbiddenException('User is blocked');
      }
      if (userTofind.password !== hashedPassword) {
        throw new UnauthorizedException('Wrong credentials');
      }
      await this.prismaService.user.update({
        where: {
          id: userTofind.id,
        },
        data: {
          loginDate: new Date(),
          refreshToken: tokens.refreshToken,
        },
      });

      return tokens;
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const userToFind = await this.prismaService.user.findFirst({
      where: {
        email: signUpDto.email,
      },
    });

    if (userToFind) {
      throw new ConflictException('User with this email already exists');
    }

    const hashPassword = await hash(
      signUpDto.password,
      this.configService.get('HASH_SALT')
    );
    const tokens = await this.generateTokens({
      username: signUpDto.username,
      email: signUpDto.email,
      type: AccountType.EMAIL,
    });

    const userCreated = await this.prismaService.user.create({
      data: {
        email: signUpDto.email,
        username: signUpDto.username,
        password: hashPassword,
        joinDate: new Date(),
        loginDate: new Date(),
        refreshToken: tokens.refreshToken,
        access: true,
        avatarUrl: null,
        role: UserRole.USER,
      },
    });

    await this.achievementsService.createEmptyAchievements(userCreated);
  }

  async requestCode(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
        type: AccountType.EMAIL,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const code = randomNumCode(CODE_LENGTH);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetCode: code,
      },
    });

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('SMTP_USER'),
      subject: 'Reset password request',
      template: path.join(__dirname, 'templates', 'reset-password.hbs'),
      context: {
        code: code,
      },
    });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: resetPasswordDto.email,
        type: AccountType.EMAIL,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.resetCode !== resetPasswordDto.code) {
      throw new BadRequestException('Wrong code');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hash(
          resetPasswordDto.password,
          this.configService.get('HASH_SALT')
        ),
        resetCode: null,
      },
    });
  }

  async refreshToken(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new ForbiddenException();
    }
    const payload: JwtPayload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      }
    );
    const user = await this.prismaService.user.findFirst({
      where: {
        refreshToken,
      },
    });
    if (!user || !payload.email) {
      throw new NotFoundException('User not found');
    }

    const tokens = await this.generateTokens({
      username: user.username,
      email: user.email,
      type: user.type,
    });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: tokens.refreshToken,
      },
    });

    return tokens;
  }

  async getAll() {
    return this.prismaService.user.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        username: true,
        email: true,
        access: true,
        avatarUrl: true,
        loginDate: true,
        joinDate: true,
        role: true,
        type: true,
        experience: true,
      },
    });
  }

  async patchUser(id: number, patchUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const tokens = await this.generateTokens({
      username: patchUserDto.username,
      email: user.email,
      type: user.type,
    });
    await this.prismaService.user.update({
      where: { id },
      data: { ...patchUserDto, refreshToken: tokens.refreshToken },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
      },
    });
    return tokens;
  }

  async patchUserAdmin(id: number, patchUserDto: UpdateUserAdminDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const tokens = await this.generateTokens({
      username: patchUserDto.username,
      email: user.email,
      type: user.type,
    });
    const typedDto = {
      username: patchUserDto.username,
      role: patchUserDto.role && Number(patchUserDto.role),
      access: patchUserDto.access && Boolean(patchUserDto.access),
      password:
        patchUserDto.password &&
        (await hash(
          patchUserDto.password,
          this.configService.get('HASH_SALT')
        )),
      refreshToken: tokens.refreshToken,
    };
    if (![0, 1].includes(typedDto.role)) {
      throw new BadRequestException('Wrong role');
    }
    return this.prismaService.user.update({
      where: { id },
      data: typedDto,
      select: {
        id: true,
        username: true,
        email: true,
        access: true,
        avatarUrl: true,
        loginDate: true,
        joinDate: true,
        role: true,
        type: true,
        experience: true,
      },
    });
  }
}
