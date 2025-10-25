import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { getCacheTTL } from './utils/tll';
import { UserModule } from './modules/user/user.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: getCacheTTL('1h'), // seconds
      max: getCacheTTL('12h'), // maximum number of items in cache
    }),
    PrismaModule.forRoot(),
    UserModule,
    TournamentModule,
    AuthModule,
  ],
})
export class AppModule {}
