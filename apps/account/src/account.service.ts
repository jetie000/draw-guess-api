import { DRAWING_RABBITMQ_QUEUE } from '@app/common/rmq/constants';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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

    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    return await this.generateTokens({
      sub: user.id,
      username: user.username,
      email: user.email,
    });
  }

  async signUp(signUpDto: SignUpDto) {}
}
