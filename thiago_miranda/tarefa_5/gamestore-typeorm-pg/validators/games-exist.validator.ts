import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { GamesRepository } from '../games/games.repository';

@ValidatorConstraint({ name: 'gamesExist', async: true })
@Injectable()
export class GamesExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async validate(ids: string[]): Promise<boolean> {
    if (!ids || ids.length === 0) return false;
    const games = await this.gamesRepository.getListByIds(ids);
    const foundGames = new Set(games.map((game) => game.id));
    return !ids.some((id) => !foundGames.has(id));
  }

  defaultMessage(): string {
    return 'One or more games were not found';
  }
}

export function GamesExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'gamesExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: GamesExistValidator,
    });
  };
}
