import { Module } from '@nestjs/common';
import { TournamentService } from './services/tournament.service';
import { TournamentController } from './controllers/tournament.controller';
import { PrismaService } from 'nestjs-prisma';
import TournamentRepository from './repository/tournament.repository';
import { TournamentPrismaRepository } from './repository/prisma/tournament.prisma';
import { UserModule } from '../user/user.module';
import { TournamentGateway } from './gateway/tournament.gateway';

@Module({
  controllers: [TournamentController],
  imports: [UserModule],
  providers: [
    TournamentService,
    PrismaService,
    {
      provide: TournamentRepository,
      useClass: TournamentPrismaRepository,
    },
    TournamentGateway
  ],
})
export class TournamentModule { }
