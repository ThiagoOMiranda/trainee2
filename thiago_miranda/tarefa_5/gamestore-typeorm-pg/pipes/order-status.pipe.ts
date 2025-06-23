import {
  Injectable,
  ParseEnumPipe,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { OrderStatusEnum } from 'src/orders/order-status.enum';

@Injectable()
export class OrderStatusPipe extends ParseEnumPipe {
  constructor() {
    super(OrderStatusEnum, {
      exceptionFactory: () =>
        new BadRequestException(
          `orderStatus must be one of ${Object.values(OrderStatusEnum).join(', ')}`,
        ),
    });
  }

  async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<OrderStatusEnum> {
    if (typeof value === 'string') {
      value = value.trim().toUpperCase();
    }
    return (await super.transform(value, metadata)) as OrderStatusEnum;
  }
}
