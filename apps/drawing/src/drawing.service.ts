import { Injectable } from '@nestjs/common';

@Injectable()
export class DrawingService {
  getHello(): string {
    return 'Hello World!';
  }
}
