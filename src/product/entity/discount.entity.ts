import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('discount')
export class Discount {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('float', { name: 'disPercent', precision: 12, default: 0 })
  disPercent: number;

  @Column('varchar')
  name: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'createdAt',
  })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];

}
