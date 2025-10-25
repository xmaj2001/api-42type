import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

export class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string | null;
    best_wpm?: number | null;
    total_matches?: number | null;
    created_at: Date;
    updated_at: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            best_wpm: this.best_wpm,
            total_matches: this.total_matches,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
