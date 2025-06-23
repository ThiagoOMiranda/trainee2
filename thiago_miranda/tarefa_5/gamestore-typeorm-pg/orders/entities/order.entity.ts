import { Column, Entity, JoinTable, ManyToMany, BeforeUpdate } from 'typeorm';

import { Game } from 'src/games/entities/game.entity';
import { OrderStatusEnum } from 'src/orders/order-status.enum';

@Entity('orders')
export class Order {
  @Column('uuid', {
    name: 'id',
    primary: true,
    nullable: false,
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('varchar', {
    name: 'customer_name',
    length: 150,
    nullable: false,
  })
  customerName: string;

  @Column('varchar', {
    name: 'customer_email',
    length: 50,
    nullable: false,
  })
  customerEmail: string;

  @Column('varchar', {
    name: 'customer_phone',
    length: 11,
    nullable: false,
  })
  customerPhone: string;

  @Column('decimal', {
    name: 'total_price',
    scale: 2,
    precision: 10,
    nullable: false,
  })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    name: 'order_status',
    default: OrderStatusEnum.PENDING,
    nullable: false,
  })
  orderStatus: OrderStatusEnum;

  @ManyToMany(() => Game, (game) => game.orders)
  @JoinTable({
    name: 'order_games',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'game_id', referencedColumnName: 'id' },
  })
  games: Game[];

  @Column({
    name: 'created_at',
    nullable: false,
    default: () => 'now()',
    type: 'timestamp without time zone',
  })
  public createdAt: Date;

  @Column({
    name: 'updated_at',
    nullable: true,
    type: 'timestamp without time zone',
  })
  public updatedAt: Date | null;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
