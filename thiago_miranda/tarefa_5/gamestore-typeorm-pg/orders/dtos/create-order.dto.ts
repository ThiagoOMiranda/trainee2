import {
  IsUUID,
  IsArray,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { GamesExist } from 'src/validators/games-exist.validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  customerName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  customerPhone: string;

  @IsArray()
  @IsNotEmpty()
  @GamesExist()
  @IsUUID('4', { each: true })
  gamesIds: string[];
}
