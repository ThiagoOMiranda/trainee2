import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { OrdersService } from './orders.service';
import { OrderStatusEnum } from './order-status.enum';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

import { OrderStatusPipe } from 'src/pipes/order-status.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  public create(@Body() orderDto: CreateOrderDto): Promise<OrderDto> {
    return this.ordersService.create(orderDto);
  }

  @Put(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() orderDto: UpdateOrderDto,
  ): Promise<OrderDto> {
    orderDto.id = id;
    return this.ordersService.update(orderDto);
  }

  @Delete(':id')
  public delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.ordersService.delete(id);
  }

  @Get()
  public getAll(): Promise<OrderDto[]> {
    return this.ordersService.getAll();
  }

  @Get(':id')
  public getById(@Param('id', ParseUUIDPipe) id: string): Promise<OrderDto> {
    return this.ordersService.getById(id);
  }

  @Get('status/:status')
  public findOrderByStatus(
    @Param('status', OrderStatusPipe) status: OrderStatusEnum,
  ): Promise<OrderDto[]> {
    return this.ordersService.findOrderByStatus(status);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  public updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status', OrderStatusPipe) orderStatus: OrderStatusEnum,
  ): Promise<OrderDto> {
    return this.ordersService.updateOrderStatus(id, orderStatus);
  }
}
