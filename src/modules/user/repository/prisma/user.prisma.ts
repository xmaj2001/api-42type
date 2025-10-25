import { Injectable } from "@nestjs/common";
import UserRepository from "../user.repository";
import { CreateUserDto, UpdateUserDto } from "../../dto/user.dto";
import { UserEntity } from "../../entities/user.entity";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async create(userData: CreateUserDto): Promise<UserEntity> {
        const user = await this.prisma.user.create({
            data: userData,
        });
        return new UserEntity(user);
    }

    async update(id: string, updateData: UpdateUserDto): Promise<UserEntity> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateData,
        });

        return updatedUser as UserEntity;
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return null;
        }
        return user as UserEntity;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return null;
        }
        return user as UserEntity;
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany();
        return users as UserEntity[];
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}