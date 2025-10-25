import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import UserRepository from './repository/user.repository';
import { UserPrismaRepository } from './repository/prisma/user.prisma';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    }
  ],
  exports: [UserRepository]
})
export class UserModule { }
