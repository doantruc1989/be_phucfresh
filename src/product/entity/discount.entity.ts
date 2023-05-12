import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('discount')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  disPercent: number;

  @Column('varchar')
  name: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];

}
