import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto, JoinTournamentDto, LeaveTournamentDto } from '../dto/tournament.dto';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly service: TournamentService) { }

  @Post()
  async create(@Body() dto: CreateTournamentDto) {
    return this.service.create(dto);
  }

  @Post(':id/join')
  // TODO: Melhorar o dto para não precisar do ID no body
  async join(@Param('id') tournamentId: string, @Body() dto: JoinTournamentDto) {
    return this.service.joinTournament({ ...dto, tournament_id: tournamentId });
  }

  @Post(':id/leave')
  // TODO: Melhorar o dto para não precisar do ID no body
  async leave(@Param('id') tournamentId: string, @Body() dto: LeaveTournamentDto) {
    return this.service.leaveTournament({ ...dto, tournament_id: tournamentId });
  }

  @Get(':id/bracket')
  async getBracket(@Param('id') tournamentId: string) {
    return this.service.findBracket(tournamentId);
  }

  @Get(':id')
  async getById(@Param('id') tournamentId: string) {
    return this.service.findById(tournamentId);
  }

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  // @Put()
  // async updateTournamentsStatus() {
  //   return this.service.updateTournamentsStatus();
  // }
}
