import { ConfigService } from '@nestjs/config';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('FRONTEND_URL'),
  },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinGame')
  async joinGame(client: Socket, @MessageBody('room') room: string) {
    client.join(room);
    client.emit('joinedGame', room);
  }

  @SubscribeMessage('leaveGame')
  async leaveGame(client: Socket, @MessageBody('room') room: string) {
    client.leave(room);
    client.emit('leftGame', room);
  }
}
