import { DRAWING_RABBITMQ_QUEUE } from '@app/common/rmq/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { compare, hash } from 'bcrypt';
import { randomCode } from '@app/common/helpers/random';
import { MailerService } from '@nestjs-modules/mailer';
import { CODE_LENGTH } from '@app/common/helpers/constants';

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.access) {
      throw new UnauthorizedException('User is blocked');
    }

    const isEqualPasswords = compare(signInDto.password, user.password);
    if (!isEqualPasswords) {
      throw new UnauthorizedException('Wrong password');
    }

    const tokens = await this.generateTokens({
      username: user.username,
      email: user.email,
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

  async signUp(signUpDto: SignUpDto) {
    const userToFind = await this.prismaService.user.findFirst({
      where: {
        email: signUpDto.email,
      },
    });

    if (userToFind) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashPassword = await hash(signUpDto.password, 10);
    const tokens = await this.generateTokens({
      username: signUpDto.username,
      email: signUpDto.email,
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
      html: `Your code is <b>${code}</b>`,
    });
  }
}
