import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import TournamentRepository from '../repository/tournament.repository';
import { CreateTournamentDto, JoinTournamentDto } from '../dto/tournament.dto';
import { TournamentEntity } from '../entities/tournament.entity';
import UserRepository from '../../user/repository/user.repository';

@Injectable()
export class TournamentService {
    constructor(
        private readonly repo: TournamentRepository,
        private readonly userRepo: UserRepository,
    ) { }

    async create(data: CreateTournamentDto): Promise<TournamentEntity> {
        const user = await this.userRepo.findById(data.created_by);
        if (!user) {
            throw new NotFoundException(`O usuário com ID ${data.created_by} não foi encontrado.`);
        }

        const tournament = await this.repo.create(data);
        if (!tournament) {
            throw new InternalServerErrorException(`Não foi possível criar o torneio.`);
        }
        const joined = await this.repo.joinTournament({
            tournament_id: tournament.id,
            user_id: data.created_by,
        });

        if (!joined) {
            throw new InternalServerErrorException(`Não foi possível inscrever o criador no torneio.`);
        }
        return tournament;
    }

    async joinTournament(data: JoinTournamentDto): Promise<boolean> {
        const tournament = await this.repo.findById(data.tournament_id);
        if (!tournament) {
            throw new NotFoundException(`O torneio com ID ${data.tournament_id} não foi encontrado.`);
        }
        const user = await this.userRepo.findById(data.user_id);
        if (!user) {
            throw new NotFoundException(`O usuário com ID ${data.user_id} não foi encontrado.`);
        }
        if (tournament.participants && tournament.participants.length >= parseInt(process.env.LIMIT_PARTICIPANTS || '6')) {
            throw new ConflictException(`O torneio com ID ${data.tournament_id} já atingiu o número máximo de participantes.`);
        }
        const participant = await this.repo.findParticipant(data.tournament_id, data.user_id);
        if (participant) {
            throw new ConflictException(`O usuário com ID ${data.user_id} já está inscrito no torneio com ID ${data.tournament_id}.`);
        }
        return this.repo.joinTournament(data);
    }

    async leaveTournament(data: JoinTournamentDto): Promise<boolean> {
        const tournament = await this.repo.findById(data.tournament_id);
        if (!tournament) {
            throw new NotFoundException(`O torneio com ID ${data.tournament_id} não foi encontrado.`);
        }
        const user = await this.userRepo.findById(data.user_id);
        if (!user) {
            throw new NotFoundException(`O usuário com ID ${data.user_id} não foi encontrado.`);
        }
        const participant = await this.repo.findParticipant(data.tournament_id, data.user_id);
        if (!participant) {
            throw new NotFoundException(`O usuário com ID ${data.user_id} não está inscrito no torneio com ID ${data.tournament_id}.`);
        }
        return this.repo.leaveTournament(data);
    }

    async findBracket(tournamentId: string): Promise<any> {
       // Todo: Implementar lógica para retornar o bracket do torneio
        return { message: `Bracket do torneio ${tournamentId}` };
    }

    async findAll(): Promise<TournamentEntity[]> {
        return this.repo.findAll();
    }

    async findById(tournamentId: string): Promise<TournamentEntity | null> {
        const tournament = await this.repo.findById(tournamentId);
        if (!tournament) {
            throw new NotFoundException(`O torneio com ID ${tournamentId} não foi encontrado.`);
        }
        return tournament;
    }

    async update(tournamentId: string, data: Partial<CreateTournamentDto>): Promise<TournamentEntity | null> {
        const tournament = await this.repo.findById(tournamentId);
        if (!tournament) {
            throw new NotFoundException(`O torneio com ID ${tournamentId} não foi encontrado.`);
        }
        return this.repo.update(tournamentId, data);
    }

    async delete(tournamentId: string): Promise<boolean> {
        const tournament = await this.repo.findById(tournamentId);
        if (!tournament) {
            throw new NotFoundException(`O torneio com ID ${tournamentId} não foi encontrado.`);
        }
        return this.repo.delete(tournamentId);
    }
}
