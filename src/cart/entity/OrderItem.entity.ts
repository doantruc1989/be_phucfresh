
import { User } from 'src/users/entity/user.entity';
import { Column, DeleteDateColumn, Entity,  ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './Payment.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column()
  address: string;

  @Column('longtext')
  orderItems: string;

  @Column()
  phone: string;

  @Column({nullable:true})
  guest: string;

  @Column()
  trans: string;

  @Column('float', { name: 'cartTotal', precision: 12, default: () => "'0'" })
  cartTotal: number;

  @Column('float', { name: 'revenue', precision: 12, default: () => "'0'" })
  revenue: number;

  @Column({default: 'cod'})
  isPaid: string;

  @Column({default: false })
  status: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'createdAt',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'modifiedAd',
  })
  modifiedAd: Date;

  @OneToOne(() => Payment)
  payment: Payment

  @ManyToOne(() => User, (user) => user.orderItem,{
    onDelete: 'CASCADE', nullable: true
  })
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;
}
