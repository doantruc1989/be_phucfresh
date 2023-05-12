import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './OrderItem.entity';


export enum Status {
  UnConfirm = 'unConfirm',
  Confirmed = 'confirmed',
  TransPorting = 'transPorting',
  Finished = 'finished',
}

export enum PaymentType {
  COD = 'cod',
  CreditCard = 'credit card',
}

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  // @Column('float', { name: 'cartTotal', precision: 12, default: () => "'0'" })
  // cartTotal: number;

  // @Column({
  //   type: 'enum',
  //   enum: Status,
  //   default: Status.UnConfirm,
  // })
  // status: Status[];

  // @Column({ default: () => 0 })
  // review: number;

  // @Column({
  //   type: 'enum',
  //   enum: PaymentType,
  //   default: PaymentType.COD,
  // })
  // paymentType: PaymentType[];

  // @Column({
  //   default: () => 'CURRENT_TIMESTAMP',
  //   type: 'timestamp',
  //   name: 'createdAt',
  // })
  // createdAt: Date;

  // @Column({
  //   default: () => 'CURRENT_TIMESTAMP',
  //   type: 'timestamp',
  //   name: 'modifiedAd',
  // })
  // modifiedAd: Date;

  // @OneToOne(() => OrderItem)
  // @JoinColumn()
  // orderItem: OrderItem

}
