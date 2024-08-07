import { NestFactory } from '@nestjs/core';
import { DrawingModule } from './drawing.module';

async function bootstrap() {
  const app = await NestFactory.create(DrawingModule);
  await app.listen(3001);
}
bootstrap();
