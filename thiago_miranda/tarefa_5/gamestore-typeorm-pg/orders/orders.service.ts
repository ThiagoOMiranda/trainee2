import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { OrderDto } from './dtos/order.dto';
import { OrderStatusEnum } from './order-status.enum';
import { OrdersRepository } from './orders.repository';
import { OrderMapper } from 'src/mappers/order.mapper';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { GamesRepository } from 'src/games/games.repository';
import { OrderStatusTransitionValidator } from 'src/validators/order-status-transition.validator';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderMapper: OrderMapper,
    private readonly gamesRepository: GamesRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  public async create(orderDto: CreateOrderDto): Promise<OrderDto> {
    const games = await this.gamesRepository.getListByIds(orderDto.gamesIds);
    const entity = this.orderMapper.toEntity(orderDto);
    entity.games = games;
    entity.totalPrice = parseFloat(
      games
        .reduce((total, game) => total + parseFloat(game.price.toString()), 0)
        .toFixed(2),
    );
    const savedEntity = await this.ordersRepository.save(entity);

    return this.orderMapper.toDto(savedEntity);
  }

  public async update(orderDto: UpdateOrderDto): Promise<OrderDto> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderDto.id },
      relations: ['games'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.orderStatus !== OrderStatusEnum.PENDING) {
      throw new BadRequestException(
        `${order.orderStatus} order cannot be modified`,
      );
    }

    const games = orderDto.gamesIds
      ? await this.gamesRepository.getListByIds(orderDto.gamesIds)
      : order.games;

    const totalPrice = parseFloat(
      games
        .reduce((total, game) => total + parseFloat(game.price.toString()), 0)
        .toFixed(2),
    );

    const updatedEntity = this.orderMapper.toEntity({
      ...order,
      ...orderDto,
    });

    updatedEntity.games = games;
    updatedEntity.totalPrice = totalPrice;
    const savedEntity = await this.ordersRepository.save(updatedEntity);

    return this.orderMapper.toDto(savedEntity);
  }

  public async updateOrderStatus(
    id: string,
    orderStatus: OrderStatusEnum,
  ): Promise<OrderDto> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['games'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const currentStatus = order.orderStatus;

    if (
      !OrderStatusTransitionValidator.isValidTransition(
        currentStatus,
        orderStatus,
      )
    ) {
      throw new BadRequestException(
        `Invalid orderStatus transition from ${currentStatus} to ${orderStatus}`,
      );
    }

    order.orderStatus = orderStatus;
    const savedEntity = await this.ordersRepository.save(order);
    return this.orderMapper.toDto(savedEntity);
  }

  public async findOrderByStatus(status: OrderStatusEnum): Promise<OrderDto[]> {
    const orders = await this.ordersRepository.findOrderByStatus(status);
    return this.orderMapper.toDtos(orders);
  }

  public async getById(id: string): Promise<OrderDto> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['games'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.orderMapper.toDto(order);
  }

  public async getAll(): Promise<OrderDto[]> {
    const orders = await this.ordersRepository.find({ relations: ['games'] });
    return this.orderMapper.toDtos(orders);
  }

  public async delete(id: string): Promise<void> {
    const order = await this.getById(id);
    await this.ordersRepository.delete({ id: order.id });
  }
}
