import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  app.enableCors({ origin: configService.get('FRONTEND_URL') });

  const port = configService.get('PORT_ACCOUNT');
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
