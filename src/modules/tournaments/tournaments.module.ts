import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TournamentsGateway } from './tournaments.gateway';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentsGateway],
})
export class TournamentsModule {}
