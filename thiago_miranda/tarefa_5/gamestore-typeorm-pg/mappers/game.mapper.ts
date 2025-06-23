import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';
import { BaseMapper } from './base.mapper';
import { GameDto } from 'src/games/dtos/game.dto';
import { Game } from 'src/games/entities/game.entity';
import { CreateGameDto } from 'src/games/dtos/create-game.dto';
import { UpdateGameDto } from 'src/games/dtos/update-game.dto';
import { GameGenreEnumValues } from 'src/games/game-genre.enum';
import { GamePlatformEnumValues } from 'src/games/game-plataform.enum';

@Injectable()
export class GameMapper extends BaseMapper<Game, GameDto> {
  toDto(entity: Game): GameDto {
    const dto = new GameDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.price = entity.price;
    dto.genre = entity.genre;
    dto.platform = entity.platform;
    dto.isActive = entity.isActive;
    dto.publisher = entity.publisher;
    dto.description = entity.description;
    dto.releaseDate = dayjs(entity.releaseDate).format('DD-MM-YYYY');
    return dto;
  }

  toEntity(dto: GameDto | CreateGameDto | UpdateGameDto): Game {
    const entity = new Game();
    if ('id' in dto && dto.id) entity.id = dto.id;
    if (dto.title) entity.title = dto.title;
    if (dto.genre && GameGenreEnumValues.includes(dto.genre)) {
      entity.genre = dto.genre;
    }
    if (dto.platform) {
      const platforms = Array.isArray(dto.platform)
        ? dto.platform
        : [dto.platform];
      entity.platform = platforms.filter((platform) => {
        return GamePlatformEnumValues.includes(platform);
      });
    }
    if (dto.publisher) entity.publisher = dto.publisher;
    if (dto.price !== undefined) entity.price = dto.price;
    if (dto.description) entity.description = dto.description;
    if (dto.releaseDate) {
      entity.releaseDate =
        typeof dto.releaseDate === 'string'
          ? dayjs(dto.releaseDate).toDate()
          : dto.releaseDate;
    }
    return entity;
  }
}
