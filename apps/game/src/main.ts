import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common';
import { GAME_RABBITMQ_QUEUE } from '@app/common/rmq/constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GameModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(GAME_RABBITMQ_QUEUE));
  await app.startAllMicroservices();
  const port = app.get(ConfigService).get('PORT_GAME');
  await app.listen(port);
}
bootstrap();
