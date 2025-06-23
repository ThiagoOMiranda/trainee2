import { Injectable, NotFoundException } from '@nestjs/common';

import { GameDto } from './dtos/game.dto';
import { GameMapper } from 'src/mappers/game.mapper';
import { GamesRepository } from './games.repository';
import { CreateGameDto } from './dtos/create-game.dto';
import { UpdateGameDto } from './dtos/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    private readonly gameMapper: GameMapper,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public async create(gameDto: CreateGameDto): Promise<GameDto> {
    const entity = this.gameMapper.toEntity(gameDto);
    const savedEntity = await this.gamesRepository.save(entity);
    return this.gameMapper.toDto(savedEntity);
  }

  public async update(gameDto: UpdateGameDto): Promise<GameDto> {
    const game = await this.gamesRepository.findOneBy({ id: gameDto.id });
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const updateEntity = this.gameMapper.toEntity({
      ...game,
      ...gameDto,
    });

    const savedEntity = await this.gamesRepository.save(updateEntity);
    return this.gameMapper.toDto(savedEntity);
  }

  public async delete(id: string): Promise<void> {
    const game = await this.getById(id);
    await this.gamesRepository.delete({ id: game.id });
  }

  public async getById(id: string): Promise<GameDto> {
    const game = await this.gamesRepository.findOneBy({ id });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return this.gameMapper.toDto(game);
  }

  public async getAll(): Promise<GameDto[]> {
    const games = await this.gamesRepository.find();
    return this.gameMapper.toDtos(games);
  }

  public async activate(id: string): Promise<void> {
    const game = await this.gamesRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    game.isActive = true;
    await this.gamesRepository.save(game);
  }

  public async inactivate(id: string): Promise<void> {
    const game = await this.gamesRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    game.isActive = false;
    await this.gamesRepository.save(game);
  }
}
