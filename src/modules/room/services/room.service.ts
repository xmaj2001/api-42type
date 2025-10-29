import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoomRepository } from '../repository/room.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { RoomEntity } from '../entities/room.entity';
import { CreateRoomDto, JoinRoomDto, LeaveRoomDto } from '../dto/room.dto';
import UserRepository from 'src/modules/user/repository/user.repository';

@Injectable()
export class RoomService {
    constructor(
        private readonly repo: RoomRepository,
        private readonly user: UserRepository
    ) { }

    async createRoom(room: CreateRoomDto): Promise<RoomEntity> {
        Logger.log(`Tentando criar a sala com o código ${room.code} pelo usuário ${room.creator_id}`);
        const user = await this.user.findById(room.creator_id);
        if (!user) {
            Logger.error(`Usuário com o ID ${room.creator_id} não encontrado.`);
            throw new NotFoundException(`Usuário com o ID ${room.creator_id} não encontrado.`);
        }
        const roomExists = await this.repo.findRoomByUserId(user.id, room.code);
        if (roomExists) {
            Logger.error(`A sala com o código ${room.code} já existe.`);
            throw new ConflictException(`A sala com o código ${room.code} já existe.`);
        }
        Logger.log(`Criando a sala com o código ${room.code}`);
        return this.repo.createRoom(room);
    }

    //TODO: Implementar updateRoom se necessário!
    // async updateRoom(room: RoomEntity): Promise<RoomEntity> {
    //     const existingRoom = await this.repo.findRoomById(room.id);
    //     if (!existingRoom) {
    //         throw new NotFoundException(`Sala com o ID ${room.id} não encontrada.`);
    //     }
    //     return this.repo.updateRoom(room);
    // }

    async deleteRoom(roomId: string): Promise<void> {
        Logger.log(`Tentando deletar a sala com o ID ${roomId}`);
        const existingRoom = await this.repo.findRoomById(roomId);
        if (!existingRoom) {
            Logger.error(`Sala com o ID ${roomId} não encontrada.`);
            throw new NotFoundException(`Sala com o ID ${roomId} não encontrada.`);
        }
        Logger.log(`Sala com o ID ${roomId} encontrada.`);
        return this.repo.deleteRoom(roomId);
    }

    async joinUserToRoom(join: JoinRoomDto): Promise<RoomEntity | null> {
        Logger.log(`Tentando adicionar o usuário ${join.user_id} à sala ${join.code}`);
        const existingRoom = await this.repo.findRoomByCode(join.code);
        if (!existingRoom) {
            Logger.error(`Sala com o código ${join.code} não encontrada.`);
            throw new NotFoundException(`Sala com o código ${join.code} não encontrada.`);
        }
        const user = await this.user.findById(join.user_id);
        if (!user) {
            Logger.error(`Usuário com o ID ${join.user_id} não encontrado.`);
            throw new NotFoundException(`Usuário com o ID ${join.user_id} não encontrado.`);
        }
        const isUserInRoom = await this.repo.findRoomByUserId(join.user_id, join.code);
        if (isUserInRoom) {
            Logger.error(`O usuário com o ID ${join.user_id} já está na sala ${join.code}.`);
            throw new ConflictException(`O usuário com o ID ${join.user_id} já está na sala ${join.code}.`);
        }
        Logger.log(`Adicionando o usuário ${join.user_id} à sala ${join.code}`);
        return this.repo.joinRoom(join);
    }

    async leaveRoom(leave: LeaveRoomDto): Promise<boolean> {
        Logger.log(`Tentando remover o usuário ${leave.user_id} da sala ${leave.code}`);
        const existingRoom = await this.repo.findRoomByCode(leave.code);
        if (!existingRoom) {
            Logger.error(`Sala com o código ${leave.code} não encontrada.`);
            throw new NotFoundException(`Sala com o código ${leave.code} não encontrada.`);
        }
        const user = await this.user.findById(leave.user_id);
        if (!user) {
            Logger.error(`Usuário com o ID ${leave.user_id} não encontrado.`);
            throw new NotFoundException(`Usuário com o ID ${leave.user_id} não encontrado.`);
        }
        Logger.log(`Removendo o usuário ${leave.user_id} da sala ${leave.code}`);
        return this.repo.leaveRoom(leave);
    }

    async findRoomById(roomId: string): Promise<RoomEntity | null> {
        Logger.log(`Tentando encontrar a sala com o ID ${roomId}`);
        const room = await this.repo.findRoomById(roomId);
        if (!room) {
            Logger.error(`Sala com o ID ${roomId} não encontrada.`);
            throw new NotFoundException(`Sala com o ID ${roomId} não encontrada.`);
        }
        return room;
    }

    async findRoomByCode(code: string): Promise<RoomEntity | null> {
        Logger.log(`Tentando encontrar a sala com o código ${code}`);
        const room = await this.repo.findRoomByCode(code);
        if (!room) {
            Logger.error(`Sala com o código ${code} não encontrada.`);
            throw new NotFoundException(`Sala com o código ${code} não encontrada.`);
        }
        return room;
    }

    async updateStartGame(roomCode: string): Promise<RoomEntity | null> {
        Logger.log(`Tentando iniciar o jogo na sala ${roomCode}`);
        const room = await this.repo.findRoomByCode(roomCode);
        if (!room) {
            Logger.error(`Sala com o código ${roomCode} não encontrada.`);
            throw new NotFoundException(`Sala com o código ${roomCode} não encontrada.`);
        }
        return this.repo.updateStartGame(roomCode);
    }

    async updateEndGame(roomCode: string): Promise<RoomEntity | null> {
        Logger.log(`Tentando finalizar o jogo na sala ${roomCode}`);
        const room = await this.repo.findRoomByCode(roomCode);
        if (!room) {
            Logger.error(`Sala com o código ${roomCode} não encontrada.`);
            throw new NotFoundException(`Sala com o código ${roomCode} não encontrada.`);
        }
        Logger.log(`Finalizando o jogo na sala ${roomCode}`);
        return this.repo.updateEndGame(roomCode);
    }

}
