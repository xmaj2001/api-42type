import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
} from 'class-validator';
import { TournamentStatus } from '../entities/tournament.entity';

export class CreateTournamentDto {
    @IsString({ message: 'O campo [name] deve ser uma string' })
    @IsNotEmpty({ message: 'O campo [name] é obrigatório' })
    name: string;

    @IsString({ message: 'O campo [description] deve ser uma string' })
    @IsOptional()
    description?: string;

    @IsString({ message: 'O campo [created_by] deve ser uma string o id do usuário' })
    @IsNotEmpty({ message: 'O campo [created_by] é obrigatório' })
    created_by: string;

    @IsEnum(TournamentStatus, { message: `O campo [status] deve ser um dos seguintes valores: ${Object.values(TournamentStatus).join(', ')} ` })
    @IsOptional()
    status?: TournamentStatus;
}

export class UpdateTournamentDto {
    @IsString({ message: 'O campo [name] deve ser uma string' })
    @IsOptional()
    name?: string;

    @IsString({ message: 'O campo [description] deve ser uma string' })
    @IsOptional()
    description?: string;

    @IsEnum(TournamentStatus, { message: `O campo [status] deve ser um dos seguintes valores: ${Object.values(TournamentStatus).join(', ')} ` })
    @IsOptional()
    status?: TournamentStatus;
}

export class JoinTournamentDto {
    @IsString({ message: 'O campo [user_id] deve ser uma string o id do usuário' })
    @IsNotEmpty({ message: 'O campo [user_id] é obrigatório' })
    user_id: string;

    @IsString({ message: 'O campo [tournament_id] deve ser uma string o id do torneio' })
    @IsNotEmpty({ message: 'O campo [tournament_id] é obrigatório' })
    tournament_id: string;
}

export class LeaveTournamentDto {
    @IsString({ message: 'O campo [user_id] deve ser uma string o id do usuário' })
    @IsNotEmpty({ message: 'O campo [user_id] é obrigatório' })
    user_id: string;

    @IsString({ message: 'O campo [tournament_id] deve ser uma string o id do torneio' })
    @IsNotEmpty({ message: 'O campo [tournament_id] é obrigatório' })
    tournament_id: string;
}

export class TournamentBracketDto {
    @IsString({ message: 'O campo [tournament_id] deve ser uma string o id do torneio' })
    @IsNotEmpty({ message: 'O campo [tournament_id] é obrigatório' })
    tournament_id: string;
}

// Status possíveis: 'upcoming', 'active', 'completed'

export class TournamentFilterDto {
    @IsEnum(TournamentStatus, { message: `O campo [status] deve ser um dos seguintes valores: ${Object.values(TournamentStatus).join(', ')} ` })
    @IsOptional()
    status?: TournamentStatus;
}