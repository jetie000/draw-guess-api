import path from 'path';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DRAWING_RABBITMQ_QUEUE } from '@app/common/rmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { compare, hash } from 'bcrypt';
import { randomCode } from '@app/common/helpers/random';
import { MailerService } from '@nestjs-modules/mailer';
import { CODE_LENGTH } from '@app/common/helpers/constants';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleService } from './modules/google/google.service';
import { JwtPayload } from './typings/interfaces/jwt-payload.interface';
import { AccountType } from './typings/enums';

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly googleService: GoogleService,
    @Inject(DRAWING_RABBITMQ_QUEUE) private drawingClient: ClientProxy
  ) {}

  async getHello() {
    await lastValueFrom(
      this.drawingClient.emit('hello', 'message from account!!!')
    );
    return 'Hello World!';
  }

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
      await this.prismaService.user.create({
        data: {
          email: googleInfo.email,
          username: googleInfo.name,
          password: hashedPassword,
          joinDate: new Date(),
          loginDate: new Date(),
          refreshToken: tokens.refreshToken,
          access: true,
          avatarUrl: googleInfo.picture,
          role: 0,
          type: AccountType.GOOGLE,
        },
      });

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

    await this.prismaService.user.create({
      data: {
        email: signUpDto.email,
        username: signUpDto.username,
        password: hashPassword,
        joinDate: new Date(),
        loginDate: new Date(),
        refreshToken: tokens.refreshToken,
        access: true,
        avatarUrl: null,
        role: 0,
      },
    });
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
    const code = randomCode(CODE_LENGTH);

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
}
