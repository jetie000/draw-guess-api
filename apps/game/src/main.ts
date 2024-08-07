import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';

async function bootstrap() {
  const app = await NestFactory.create(GameModule);
  await app.listen(3002);
}
bootstrap();
