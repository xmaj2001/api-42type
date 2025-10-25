import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import UserRepository from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly repo: UserRepository,
    ) { }

    async create(userData: CreateUserDto) {
       const user = await this.repo.findByEmail(userData.email);
       if (user) {
           throw new ConflictException(`O usuário com email ${userData.email} já existe.`);
       }
       return this.repo.create(userData);
    }

    async findById(id: string) {
        const user = await this.repo.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.repo.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
        }
        return user;
    }

    async findAll() {
        return this.repo.findAll();
    }

    async update(id: string, userData: UpdateUserDto) {
        const user = await this.repo.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return this.repo.update(id, userData);
    }

    async delete(id: string) {
        const user = await this.repo.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return this.repo.delete(id);
    }
}
