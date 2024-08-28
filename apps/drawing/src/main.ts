import { NestFactory } from '@nestjs/core';
import { DrawingModule } from './drawing.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common';
import { DRAWING_RABBITMQ_QUEUE } from '@app/common/rmq/constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(DrawingModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(DRAWING_RABBITMQ_QUEUE));
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.get('FRONTEND_URL') });
  const port = configService.get('PORT_DRAWING');
  await app.listen(port);
}
bootstrap();
