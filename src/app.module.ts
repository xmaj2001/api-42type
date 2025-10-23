import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';

@Module({
  imports: [UsersModule, TournamentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
