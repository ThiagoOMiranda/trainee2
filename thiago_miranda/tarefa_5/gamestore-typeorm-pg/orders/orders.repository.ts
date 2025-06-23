import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { OrderStatusEnum } from './order-status.enum';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  public findOrderByStatus(status: OrderStatusEnum): Promise<Order[]> {
    return this.createQueryBuilder('order')
      .leftJoinAndSelect('order.games', 'game')
      .where('order.orderStatus = :status', { status })
      .orderBy('order.createdAt', 'DESC')
      .getMany();
  }
}
