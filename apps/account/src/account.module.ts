import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaModule } from '@app/common';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DRAWING_RABBITMQ_QUEUE,
  GAME_RABBITMQ_QUEUE,
} from '@app/common/rmq/constants';
import { JwtModule } from '@nestjs/jwt';

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
    PrismaModule,
    RmqModule.register({ name: DRAWING_RABBITMQ_QUEUE }),
    RmqModule.register({ name: GAME_RABBITMQ_QUEUE }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
