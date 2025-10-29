import { Player } from "./room-join.entity";

export class RoomEntity {
  id: string;
  code: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  creator_id: string;
  Players: Player[];

  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }

}