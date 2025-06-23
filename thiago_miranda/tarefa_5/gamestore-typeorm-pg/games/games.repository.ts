import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Game } from './entities/game.entity';

@Injectable()
export class GamesRepository extends Repository<Game> {
  constructor(private dataSource: DataSource) {
    super(Game, dataSource.createEntityManager());
  }

  public getListByIds(ids: string[]): Promise<Game[]> {
    return this.createQueryBuilder('game')
      .where('game.id IN (:...ids)', { ids })
      .getMany();
  }
}
