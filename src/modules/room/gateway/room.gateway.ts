import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateRoomDto, JoinRoomDto, LeaveRoomDto, PlayerProgressDto } from '../dto/room.dto';
import { RoomService } from '../services/room.service';
import { Logger, UseFilters, UsePipes } from '@nestjs/common';
import { WsValidationPipe } from 'src/shared/pipe/websocket.pipe';
import { UserService } from 'src/modules/user/services/user.service';
import { WebsocketExceptionsFilter } from 'src/shared/error/websocket.exception';

@WebSocketGateway(
  {
    namespace: 'rooms',
    cors: {
      origin: '*',
    },
  }
)

@UseFilters(new WebsocketExceptionsFilter())
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly service: RoomService,
    private readonly user: UserService
  ) { }

  // Criar uma sala
  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('create-room')
  async handleCreateRoom(client: Socket, payload: CreateRoomDto): Promise<void> {
    const room = await this.service.createRoom(payload);
    client.join(room.code);
    Logger.log(`Sala criada com o código ${room.code} pelo usuário ${payload.creator_id}`);
    client.emit('room-created', room);
    Logger.log(`Enviada confirmação de criação da sala ${room.code} para o usuário ${payload.creator_id}`);
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('join-room')
  async handleJoinRoom(client: Socket, payload: JoinRoomDto): Promise<void> {
    const { code, user_id } = payload;
    const room = await this.service.joinUserToRoom(payload);
    if (!room) {
      client.emit('error', `A sala com o código ${code} não existe.`);
      return;
    }
    client.join(code);
    Logger.log(`Usuário ${user_id} entrou na sala ${code}`);
    // Notificar outros jogadores na sala
    const user = await this.user.findById(user_id);
    this.server.to(code).emit('player-joined', user);
    Logger.log(`Notificado outros jogadores na sala ${code} sobre o novo jogador ${user_id}.`);
    // Enviar lista completa de jogadores para o novo jogador
    const players = room.Players;
    client.emit('room-players', players);
    Logger.log(`Enviada lista de jogadores para o usuário ${user_id} na sala ${code}.`);
    // Broadcast para todos: número de jogadores atualizado
    this.server.to(code).emit('room-update', {
      roomId: room.id,
      playerCount: room.Players.length,
      players: room.Players,
      hostId: room.creator_id,
    });
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('leave-room')
  async handleLeaveRoom(client: Socket, payload: LeaveRoomDto): Promise<void> {
    const { code, user_id } = payload;
    const leaveRoom = await this.service.leaveRoom(payload);
    if (!leaveRoom) {
      client.emit('error', `A sala com o código ${code} não existe.`);
      return;
    }
    client.leave(code);
    Logger.log(`Usuário ${user_id} saiu da sala ${code}`);
    // Notificar outros jogadores na sala
    this.server.to(code).emit('player-left', user_id);

    // Broadcast para todos: número de jogadores atualizado
    const room = await this.service.findRoomByCode(code);
    if (room) {
      Logger.log(`Sala com o código ${code} encontrada.`);
      this.server.to(code).emit('room-update', {
        roomId: room.id,
        playerCount: room.Players.length,
        players: room.Players,
        hostId: room.creator_id,
      });
    }
    else {
      Logger.log(`Sala com o código ${code} não encontrada.`);
      this.server.to(code).emit('room-update', {
        roomId: null,
        playerCount: 0,
        players: [],
        hostId: null,
      });
    }
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('update-progress')
  async handleUpdateProgress(client: Socket, payload: PlayerProgressDto): Promise<void> {
    const { roomId, playerId, progress, wpm, isFinished } = payload;

    Logger.log(`Atualizando progresso do jogador ${playerId} na sala ${roomId}: progresso=${progress}, wpm=${wpm}, isFinished=${isFinished}`);

    // Emitir atualização para todos os jogadores na sala
    this.server.to(roomId).emit('player-update', {
      playerId,
      progress,
      wpm,
      isFinished,
    });
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('start-race')
  async handleStartRace(client: Socket, roomCode: string): Promise<void> {
    const room = await this.service.updateStartGame(roomCode);
    if (!room) {
      client.emit('error', `A sala com o código ${roomCode} não existe.`);
      return;
    }
    Logger.log(`Iniciando corrida na sala ${roomCode}`);
    this.server.to(roomCode).emit('race-started', room);
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('race-finished')
  async handleRaceFinished(client: Socket, roomCode: string): Promise<void> {
    const room = await this.service.updateEndGame(roomCode);
    if (!room) {
      client.emit('error', `A sala com o código ${roomCode} não existe.`);
      return;
    }
    Logger.log(`Corrida finalizada na sala ${roomCode}`);
    this.server.to(roomCode).emit('player-finished', room);
  }
}
