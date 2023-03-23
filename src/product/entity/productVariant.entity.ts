import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('productvariant')
export class ProductVariant {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('int', { name: 'typePrice', default: 0 })
  typePrice: number;

  @Column('varchar')
  type: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'createdAt',
  })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.productvariant,{
    onDelete: 'CASCADE'
  })
  product: Product;
}
