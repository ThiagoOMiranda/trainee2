import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { GameGenreEnum } from '../game-genre.enum';
import { GamePlatformEnum } from '../game-plataform.enum';

export class UpdateGameDto {
  @IsUUID('4')
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsString()
  @IsOptional()
  @MaxLength(650)
  description?: string;

  @IsEnum(GameGenreEnum)
  @IsOptional()
  genre?: GameGenreEnum;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  publisher?: string;

  @IsOptional()
  @IsEnum(GamePlatformEnum)
  platform?: GamePlatformEnum[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  releaseDate?: Date;
}
