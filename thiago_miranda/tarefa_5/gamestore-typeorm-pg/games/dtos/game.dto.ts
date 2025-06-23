import { GamePlatformEnum } from '../game-plataform.enum';
import { GameGenreEnum } from '../game-genre.enum';

export class GameDto {
  id: string;

  title: string;

  price: number;

  description: string;

  genre: GameGenreEnum;

  publisher: string;

  platform: GamePlatformEnum[];

  isActive: boolean;

  releaseDate: string;
}
