import { Controller, Get } from '@nestjs/common';
import { DrawingService } from './drawing.service';

@Controller()
export class DrawingController {
  constructor(private readonly drawingService: DrawingService) {}

  @Get()
  getHello(): string {
    return this.drawingService.getHello();
  }
}
