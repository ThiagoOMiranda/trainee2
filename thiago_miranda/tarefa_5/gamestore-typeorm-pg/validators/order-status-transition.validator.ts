import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { OrderStatusEnum } from 'src/orders/order-status.enum';

interface OrderWithStatus {
  orderStatus: OrderStatusEnum;
}

export class OrderStatusTransitionValidator
  implements ValidatorConstraintInterface
{
  private static readonly validTransitions = new Map<
    OrderStatusEnum,
    OrderStatusEnum[]
  >([
    [
      OrderStatusEnum.PENDING,
      [OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELLED],
    ],
    [OrderStatusEnum.COMPLETED, [OrderStatusEnum.SHIPPED]],
    [OrderStatusEnum.SHIPPED, [OrderStatusEnum.DELIVERED]],
  ]);

  static isValidTransition(
    currentStatus: OrderStatusEnum,
    newStatus: OrderStatusEnum,
  ): boolean {
    if (currentStatus === newStatus) return false;
    if (
      currentStatus === OrderStatusEnum.CANCELLED ||
      currentStatus === OrderStatusEnum.DELIVERED
    ) {
      return false;
    }
    const allowed = this.validTransitions.get(currentStatus) || [];
    return allowed.includes(newStatus);
  }

  validate(newStatus: OrderStatusEnum, args?: ValidationArguments): boolean {
    const object = args?.object as OrderWithStatus;
    const currentStatus = object.orderStatus;
    return OrderStatusTransitionValidator.isValidTransition(
      currentStatus,
      newStatus,
    );
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as OrderWithStatus;
    const currentStatus = object.orderStatus;
    return `Invalid orderStatus transition from ${currentStatus} to ${args.value}`;
  }
}
