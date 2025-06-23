import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { GamesModule } from 'src/games/games.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrderMapper } from 'src/mappers/order.mapper';
import { OrderStatusPipe } from 'src/pipes/order-status.pipe';
import { GamesExistValidator } from 'src/validators/games-exist.validator';
import { OrderStatusTransitionValidator } from 'src/validators/order-status-transition.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrdersRepository]), GamesModule],
  providers: [
    OrderMapper,
    OrdersService,
    OrderStatusPipe,
    OrdersRepository,
    GamesExistValidator,
    OrderStatusTransitionValidator,
  ],
  controllers: [OrdersController],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
