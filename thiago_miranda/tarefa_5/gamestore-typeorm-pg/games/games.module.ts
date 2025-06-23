import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Game } from './entities/game.entity';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { GamesController } from './games.controller';
import { GameMapper } from 'src/mappers/game.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamesRepository])],
  providers: [GamesService, GamesRepository, GameMapper],
  controllers: [GamesController],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
