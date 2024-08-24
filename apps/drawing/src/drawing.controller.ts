import { Controller, Get, Logger } from '@nestjs/common';
import { DrawingService } from './drawing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller('drawing')
export class DrawingController {
  constructor(
    private readonly drawingService: DrawingService,
    private readonly rmqService: RmqService
  ) {}

  private readonly logger = new Logger(DrawingController.name);

  @Get()
  getHello(): string {
    return this.drawingService.getHello();
  }

  @EventPattern('hello')
  handleHello(@Payload() data: string, @Ctx() context: RmqContext) {
    this.logger.log(`data: ${data}`);
    this.rmqService.ack(context);
  }
}
