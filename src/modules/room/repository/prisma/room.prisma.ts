import { Injectable } from "@nestjs/common";
import { RoomRepository } from "../room.repository";
import { CreateRoomDto, JoinRoomDto, LeaveRoomDto } from "../../dto/room.dto";
import { RoomEntity } from "../../entities/room.entity";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class RoomPrismaRepository implements RoomRepository {
    constructor(private readonly prisma: PrismaService) { }
    async createRoom(room: CreateRoomDto): Promise<RoomEntity> {
        const newRoom = await this.prisma.room.create({ data: room });
        return new RoomEntity(newRoom);
    }

    async deleteRoom(roomId: string): Promise<void> {
        await this.prisma.room.delete({ where: { id: roomId } });
    }

    async joinRoom(data: JoinRoomDto): Promise<RoomEntity | null> {
        const result = await this.prisma.player.create({
            data: {
                code: data.code,
                user_id: data.user_id,
                name: data.name,
            },
            include:{ Room: true },
        });
        return result ? new RoomEntity(result.Room) : null;
    }

    async leaveRoom(data: LeaveRoomDto): Promise<boolean> {
        const result = await this.prisma.player.deleteMany({
            where: {
                code: data.code,
                user_id: data.user_id,
            },
        });
        return result.count > 0;
    }

    async findRoomById(roomId: string): Promise<RoomEntity | null> {
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        return room ? new RoomEntity(room) : null;
    }

    async findRoomByCode(code: string): Promise<RoomEntity | null> {
        const room = await this.prisma.room.findUnique({ where: { code } });
        return room ? new RoomEntity(room) : null;
    }

    async findAllRooms(): Promise<RoomEntity[]> {
        const rooms = await this.prisma.room.findMany();
        return rooms.map(room => new RoomEntity(room));
    }

    async findRoomByUserId(userId: string, code: string): Promise<RoomEntity | null> {
        const roomJoin = await this.prisma.player.findFirst({
            where: {
                user_id: userId,
                code: code,
            },
            include: {
                Room: true, 
            },
        });
        return roomJoin ? new RoomEntity(roomJoin.Room) : null;
    }

    async updateStartGame(roomCode: string): Promise<RoomEntity | null> {
        const updatedRoom = await this.prisma.room.update({
            where: { code: roomCode },
            data: { is_active: true },
        });
        return updatedRoom ? new RoomEntity(updatedRoom) : null;
    }

    async updateEndGame(roomCode: string): Promise<RoomEntity | null> {
        const updatedRoom = await this.prisma.room.update({
            where: { code: roomCode },
            data: { is_active: false },
        });
        return updatedRoom ? new RoomEntity(updatedRoom) : null;
    }

}