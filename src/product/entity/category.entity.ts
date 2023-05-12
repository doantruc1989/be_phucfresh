import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { name: 'category', length: 75, nullable: true })
  category: string;

  @Column('varchar')
  path: string;

  // @OneToMany(() => Product, (product) => product.category)
  // product: Product[];
  
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;
}
