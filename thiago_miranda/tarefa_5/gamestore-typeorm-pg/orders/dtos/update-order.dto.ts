import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { GamesExist } from 'src/validators/games-exist.validator';

export class UpdateOrderDto {
  @IsUUID('4')
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  customerName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  customerEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  customerPhone?: string;

  @IsArray()
  @IsOptional()
  @ValidateIf((orderDto: UpdateOrderDto) => orderDto.gamesIds !== undefined)
  @GamesExist()
  @IsUUID('4', { each: true })
  gamesIds?: string[];
}
