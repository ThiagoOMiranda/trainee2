import { BeforeUpdate, Column, Entity, ManyToMany } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { GameGenreEnum } from 'src/games/game-genre.enum';
import { GamePlatformEnum } from 'src/games/game-plataform.enum';

@Entity('games')
export class Game {
  @Column('uuid', {
    name: 'id',
    primary: true,
    nullable: false,
    default: () => 'uuid_generate_v4()',
  })
  public id: string;

  @Column('varchar', {
    name: 'title',
    length: 150,
    nullable: false,
  })
  public title: string;

  @Column('decimal', {
    name: 'price',
    scale: 2,
    precision: 10,
    nullable: false,
    default: 0.0,
  })
  public price: number;

  @Column('varchar', {
    name: 'description',
    length: 650,
    nullable: false,
  })
  public description: string;

  @Column('varchar', {
    name: 'publisher',
    length: 150,
    nullable: false,
  })
  public publisher: string;

  @Column({ type: 'enum', enum: GameGenreEnum, name: 'genre', nullable: false })
  public genre: GameGenreEnum;

  @Column({
    type: 'enum',
    enum: GamePlatformEnum,
    name: 'platform',
    array: true,
    nullable: false,
  })
  public platform: GamePlatformEnum[];

  @Column({
    name: 'release_date',
    type: 'date',
    nullable: false,
  })
  public releaseDate: Date;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  public isActive: boolean;

  @ManyToMany(() => Order, (order) => order.games)
  public orders: Order[];

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
