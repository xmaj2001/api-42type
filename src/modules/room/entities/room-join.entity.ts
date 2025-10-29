export class Player {
  id: string;
  user_id: string;
  code: string;
  name: string;
  avatar: string | undefined;
  progress: number;
  wpm: number;
  isFinished: boolean;
  joined_at: Date;

  constructor(partial: Partial<Player>) {
    Object.assign(this, partial);
  }
}
