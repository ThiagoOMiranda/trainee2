import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
  ParseUUIDPipe,
} from '@nestjs/common';

import { GameDto } from './dtos/game.dto';
import { GamesService } from './games.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { UpdateGameDto } from './dtos/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  public create(@Body() gameDto: CreateGameDto): Promise<GameDto> {
    return this.gamesService.create(gameDto);
  }

  @Put(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() gameDto: UpdateGameDto,
  ): Promise<GameDto> {
    gameDto.id = id;
    return this.gamesService.update(gameDto);
  }

  @Delete(':id')
  public delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.gamesService.delete(id);
  }

  @Get()
  public getAll(): Promise<GameDto[]> {
    return this.gamesService.getAll();
  }

  @Get(':id')
  public getById(@Param('id', ParseUUIDPipe) id: string): Promise<GameDto> {
    return this.gamesService.getById(id);
  }

  @Patch(' :id/inactive')
  public inactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.gamesService.inactivate(id);
  }

  @Patch(' :id/activate')
  public activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.gamesService.activate(id);
  }
}
