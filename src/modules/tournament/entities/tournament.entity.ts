export enum TournamentStatus {
    UPCOMING = 'upcoming',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
}

export class ParticipantEntity {
    id: string
    tournament_id: string
    joined_at?: Date | null
    user_id: string

    constructor(partial: Partial<ParticipantEntity>) {
        Object.assign(this, partial);
    }
}

export class TournamentEntity {
    id: string
    name: string
    description?: string | null
    start_date?: Date | null
    end_date?: Date | null
    created_by: string
    participants?: ParticipantEntity[] | []
    status: string
    created_at: Date
    updated_at: Date
    constructor(partial: Partial<TournamentEntity>) {
        Object.assign(this, partial);
    }
}