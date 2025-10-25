import { Injectable } from "@nestjs/common";
import TournamentRepository from "../tournament.repository";
import { CreateTournamentDto, JoinTournamentDto, LeaveTournamentDto, UpdateTournamentDto } from "../../dto/tournament.dto";
import { ParticipantEntity, TournamentEntity } from "../../entities/tournament.entity";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class TournamentPrismaRepository implements TournamentRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    
    async create(data: CreateTournamentDto): Promise<TournamentEntity> {
        const createdTournament = await this.prisma.tournament.create({
            data: data
        });
        return new TournamentEntity(createdTournament);
    }

    async joinTournament(joinTournamentDto: JoinTournamentDto): Promise<boolean> {
        const { tournament_id, user_id } = joinTournamentDto;
        const tournament = await this.prisma.participant.create({
            data: {
                tournament_id: tournament_id,
                user_id: user_id
            }
        });
        return !!tournament;
    }

    async leaveTournament(leaveTournamentDto: LeaveTournamentDto): Promise<boolean> {
        const { tournament_id, user_id } = leaveTournamentDto;
        const deleted = await this.prisma.participant.deleteMany({
            where: {
                tournament_id: tournament_id,
                user_id: user_id
            }
        });
        return deleted.count > 0;
    }

    async findBracket(tournamentId: string): Promise<TournamentEntity | null> {
        // TODO: Implementação do método findBracket usando Prisma
        return null;
    }

    async findParticipant(tournamentId: string, userId: string): Promise<ParticipantEntity | null> {
        const participant = await this.prisma.participant.findFirst({
            where: {
                tournament_id: tournamentId,
                user_id: userId
            }
        });
        return participant ? new ParticipantEntity(participant) : null;
    }

    async findById(tournamentId: string): Promise<TournamentEntity | null> {
        const tournament = await this.prisma.tournament.findUnique({
            where: { id: tournamentId },
            include: { participants: true },
        });
        return tournament ? new TournamentEntity(tournament) : null;
    }

    async findAll(): Promise<TournamentEntity[]> {
        const tournaments = await this.prisma.tournament.findMany(
            {
                include: { participants: true },
                orderBy: { created_at: 'desc' },
            }
        );
        return tournaments.map(tournament => new TournamentEntity(tournament));
    }

    async update(tournamentId: string, updateData: UpdateTournamentDto): Promise<TournamentEntity> {
        const updatedTournament = await this.prisma.tournament.update({
            where: { id: tournamentId },
            data: updateData
        });
        return new TournamentEntity(updatedTournament);
    }

    async delete(tournamentId: string): Promise<boolean> {
        const deleted = await this.prisma.tournament.deleteMany({
            where: { id: tournamentId }
        });
        return deleted.count > 0;
    }
}