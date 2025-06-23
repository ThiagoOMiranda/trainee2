import { Injectable } from '@nestjs/common';

import { BaseMapper } from './base.mapper';
import { OrderDto } from 'src/orders/dtos/order.dto';
import { Order } from 'src/orders/entities/order.entity';
import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dtos/update-order.dto';

@Injectable()
export class OrderMapper extends BaseMapper<Order, OrderDto> {
  toDto(entity: Order): OrderDto {
    const dto = new OrderDto();
    dto.id = entity.id;
    dto.totalPrice = entity.totalPrice;
    dto.orderStatus = entity.orderStatus;
    dto.customerName = entity.customerName;
    dto.customerEmail = entity.customerEmail;
    dto.customerPhone = entity.customerPhone;
    dto.gamesIds = entity.games?.map((game) => game.id) || [];
    return dto;
  }

  toEntity(dto: OrderDto | CreateOrderDto | UpdateOrderDto): Order {
    const entity = new Order();
    if ('id' in dto && dto.id) entity.id = dto.id;
    if (dto.customerName) entity.customerName = dto.customerName;
    if ('orderStatus' in dto) entity.orderStatus = dto.orderStatus;
    if (dto.customerEmail) entity.customerEmail = dto.customerEmail;
    if (dto.customerPhone) entity.customerPhone = dto.customerPhone;
    return entity;
  }
}
