import { CreateTournamentDto, JoinTournamentDto, LeaveTournamentDto, UpdateTournamentDto } from "../dto/tournament.dto";
import { ParticipantEntity, TournamentEntity } from "../entities/tournament.entity";

abstract class TournamentRepository {

    abstract create(tournamentData: CreateTournamentDto): Promise<TournamentEntity>;

    abstract joinTournament(joinTournamentDto: JoinTournamentDto): Promise<boolean>;

    abstract leaveTournament(leaveTournamentDto: LeaveTournamentDto): Promise<boolean>;
    
    abstract findBracket(tournamentId: string): Promise<TournamentEntity | null>;

    abstract findParticipant(tournamentId: string, userId: string): Promise<ParticipantEntity | null>;

    abstract findById(tournamentId: string): Promise<TournamentEntity | null>;

    abstract findAll(): Promise<TournamentEntity[]>;

    abstract update(tournamentId: string, updateData: UpdateTournamentDto): Promise<TournamentEntity>;

    abstract delete(tournamentId: string): Promise<boolean>;
}

export default TournamentRepository;