import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateTournamentDto, JoinTournamentDto, LeaveTournamentDto } from '../dto/tournament.dto';
import { TournamentService } from '../services/tournament.service';
import { Logger, UseFilters, UsePipes } from '@nestjs/common';
import { WsValidationPipe } from 'src/shared/pipe/websocket.pipe';
import { WebsocketExceptionsFilter } from 'src/shared/error/websocket.exception';

@WebSocketGateway({
  namespace: '/tournaments',
  cors: {
    origin: '*',
  },
})

@UseFilters(new WebsocketExceptionsFilter())
export class TournamentGateway {
  @WebSocketServer()
  server: Server;
  constructor(private tournamentService: TournamentService) { }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('create')
  async handleCreateTournament(client: Socket, payload: CreateTournamentDto) {
    Logger.log(`Criando um novo torneio com dados: ${JSON.stringify(payload)}`);
    const tournament = await this.tournamentService.create(payload);
    client.join(`tournament_${tournament.id}`);
    client.emit('tournamentCreated', tournament);
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('join')
  async handleJoinTournament(client: Socket, payload: JoinTournamentDto) {
    Logger.log(`O jogador ${payload.user_id} está tentando entrar no torneio ${payload.tournament_id}`);
    const result = await this.tournamentService.joinTournament(payload);
    if (result) {
      client.join(`tournament_${payload.tournament_id}`);
      this.server.emit('playerJoined', { tournamentId: payload.tournament_id, userId: payload.user_id });
    }
  }

  @UsePipes(new WsValidationPipe())
  @SubscribeMessage('leave')
  async handleLeaveTournament(client: Socket, payload: LeaveTournamentDto) {
    Logger.log(`O jogador ${payload.user_id} está tentando sair do torneio ${payload.tournament_id}`);
    const result = await this.tournamentService.leaveTournament(payload);
    if (result) {
      client.leave(`tournament_${payload.tournament_id}`);
      this.server.emit('playerLeft', { tournamentId: payload.tournament_id, userId: payload.user_id });
    }
  }


  @SubscribeMessage('progressUpdate')
  async handleProgressUpdate(client: Socket, payload: any) {
    Logger.log(`Atualizando o progresso do torneio ${payload.tournamentId}`);
    this.server.to(`tournament_${payload.tournamentId}`).emit('progressUpdate', payload.progressData);
  }

}
