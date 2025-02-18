import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app';
import { GAME_RABBITMQ_QUEUE } from '@app/rmq/constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GameModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(GAME_RABBITMQ_QUEUE));
  await app.startAllMicroservices();

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });

  const port = configService.get('PORT_GAME');
  await app.listen(port);
}
bootstrap();
