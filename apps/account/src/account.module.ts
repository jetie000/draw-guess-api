import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaModule } from '@app';
import { RmqModule } from '@app/rmq/rmq.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DRAWING_RABBITMQ_QUEUE,
  GAME_RABBITMQ_QUEUE,
} from '@app/rmq/constants';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GoogleModule } from './modules/google/google.module';
import { RolesGuard } from '@app/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { AchievementsService } from './modules/achievements/achievements.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: config.get<number>('SMTP_PORT'),
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    RmqModule.register({ name: DRAWING_RABBITMQ_QUEUE }),
    RmqModule.register({ name: GAME_RABBITMQ_QUEUE }),
    GoogleModule,
    AchievementsModule,
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AchievementsService,
    AccountService,
  ],
})
export class AccountModule {}
