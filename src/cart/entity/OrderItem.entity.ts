
import { User } from 'src/users/entity/user.entity';
import { Column, DeleteDateColumn, Entity,  ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './Payment.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column('text')
  orderItems: string;

  @Column()
  phone: string;

  @Column({nullable:true})
  guest: string;

  @Column()
  trans: string;

  @Column({default: 0})
  cartTotal: number;

  @Column({default: 0})
  revenue: number;

  @Column({default: 'cod'})
  isPaid: string;

  @Column({default: false })
  status: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'modifiedAd'
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
