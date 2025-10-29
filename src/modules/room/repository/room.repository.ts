import { CreateRoomDto, JoinRoomDto, LeaveRoomDto } from "../dto/room.dto";
import { RoomEntity } from "../entities/room.entity";

export abstract class RoomRepository{
    abstract createRoom(room: CreateRoomDto): Promise<RoomEntity>;
    // abstract updateRoom(room: UpdateRoomDto): Promise<RoomEntity>;
    abstract deleteRoom(roomId: string): Promise<void>;

    abstract joinRoom(data: JoinRoomDto): Promise<RoomEntity | null>;
    abstract leaveRoom(data: LeaveRoomDto): Promise<boolean>;

    abstract findRoomById(roomId: string): Promise<RoomEntity | null>;
    abstract findRoomByCode(code: string): Promise<RoomEntity | null>;
    abstract findAllRooms(): Promise<RoomEntity[]>;
    
    abstract findRoomByUserId(userId: string, code: string): Promise<RoomEntity | null>;

    abstract updateStartGame(roomCode: string): Promise<RoomEntity | null>;
    abstract updateEndGame(roomCode: string): Promise<RoomEntity | null>;
}