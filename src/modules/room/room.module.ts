import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { PrismaService } from 'nestjs-prisma';
import { RoomRepository } from './repository/room.repository';
import { RoomPrismaRepository } from './repository/prisma/room.prisma';
import { RoomGateway } from './gateway/room.gateway';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService,
    PrismaService,
    {
      provide: RoomRepository,
      useClass: RoomPrismaRepository
    },
    RoomGateway
  ],
  imports: [UserModule],
})
export class RoomModule { }
