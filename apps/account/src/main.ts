import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const port = app.get(ConfigService).get('PORT_ACCOUNT');
  await app.listen(port);
}
bootstrap();
