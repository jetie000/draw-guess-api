import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Player } from './interfaces/player-join.interface';

@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('FRONTEND_URL'),
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }
  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() info: { player: Player | undefined; room: number }
  ) {
    if (!info.player) return;
    client.join(String(info.room));
    this.logger.log(
      `Client with id: ${info.player.user.id} joined room: ${info.room}`
    );
    client.to(String(info.room)).emit('joinedGame', info.player);
  }

  @SubscribeMessage('leaveGame')
  async handleLeaveGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('room') room: number,
    @MessageBody('userId') userId: number
  ) {
    this.logger.log(`Client with id: ${userId} left room: ${room}`);
    client.to(String(room)).emit('leftGame', userId);
    client.leave(String(room));
  }
}
