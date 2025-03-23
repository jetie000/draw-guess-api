import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Player } from './interfaces/player-join.interface';
import { CreateGame } from './interfaces/create-game.interface';
import { SocketService } from '@app/socket/socket.service';
import { AddDrawingPart } from './interfaces/add-drawing-part.interface';

const publicRoom = 'public-room';

@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('FRONTEND_URL'),
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  server: Server;

  private logger = new Logger('GameGateway');

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }
  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('joinPublic')
  async handleJoinPublic(@ConnectedSocket() client: Socket) {
    client.join(publicRoom);
  }

  @SubscribeMessage('leavePublic')
  async handleLeavePublic(@ConnectedSocket() client: Socket) {
    client.leave(publicRoom);
  }

  @SubscribeMessage('joinGamePublic')
  async handleCreateGamePublic(
    @ConnectedSocket() client: Socket,
    @MessageBody('game') game: CreateGame
  ) {
    client.to(publicRoom).emit('joinedGamePublic', game);
  }

  @SubscribeMessage('deleteGamePublic')
  async handleCreateGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('room') room: number
  ) {
    client.to(publicRoom).emit('deletedGamePublic', room);
  }

  @SubscribeMessage('leaveGamePublic')
  async handleLeaveGamePublic(
    @ConnectedSocket() client: Socket,
    @MessageBody('room') room: number,
    @MessageBody('userId') userId: number
  ) {
    client.to(publicRoom).emit('leftGamePublic', { room, userId });
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

  @SubscribeMessage('deleteGame')
  async handleDeleteGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('room') room: number
  ) {
    this.logger.log(`Room deleted: ${room}`);
    client.to(String(room)).emit('deletedGame');
    client.leave(String(room));
  }

  @SubscribeMessage('drewPart')
  async handleDrewPart(
    @ConnectedSocket() client: Socket,
    @MessageBody() drawingData: AddDrawingPart
  ) {
    client.to(String(drawingData.room)).emit('drewPart', drawingData.drawing);
  }
}
