import { User } from 'src/users/entity/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('text')
  comment: string;

  @Column('smallint', { name: 'stars', default: 5 })
  stars: number;

  @Column({ name: 'parentId', nullable: true })
  parentId: number;

  @Column('varchar', { name: 'type', default: 'original' })
  type: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  // @ManyToOne(() => Product, (product) => product.review, {
  //   onDelete: 'CASCADE',
  // })
  // product: Product;

  // @ManyToOne(() => User, (user) => user.review, {
  //   onDelete: 'CASCADE',
  // })
  // user: User;

  @DeleteDateColumn()
  deletedAt?: Date;
}
