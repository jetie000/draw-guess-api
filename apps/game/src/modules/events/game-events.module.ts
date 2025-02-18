import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { SocketModule } from '@app/socket/socket.module';

@Module({
  providers: [GameGateway],
  imports: [SocketModule],
})
export class GameEventsModule {}
