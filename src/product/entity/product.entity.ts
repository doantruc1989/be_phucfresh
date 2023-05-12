import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Discount } from './discount.entity';
import { ProductImage } from './productImage.entity';
import { ProductVariant } from './productVariant.entity';
import { Review } from './review.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { name: 'productName' })
  productName: string;

  @Column('varchar')
  slug: string;

  @Column('float', { name: 'price', precision: 12, default: 0 })
  price: number;

  @Column('float', { name: 'initialPrice', precision: 12, default: 0 })
  initialPrice: number;

  @Column('smallint', { name: 'quantity', default: 100 })
  quantity: number;

  @Column('smallint', { name: 'sold', default: 99 })
  sold: number;

  @Column('varchar', { name: 'stars', default: 5 })
  stars: number;

  @Column('varchar')
  image: string;

  @Column({default: true})
  active: boolean;

  @Column('varchar')
  brand: string;

  @Column('varchar', { name: 'content', nullable: true, length: 10000 })
  content: string | null;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  // @ManyToOne(() => Category, (category) => category.product, {
  //   onDelete: 'CASCADE',
  // })
  // category: Category;

  // @ManyToOne(() => Discount, (discount) => discount.product, {
  //   onDelete: 'CASCADE',
  // })
  // discount: Discount;

  // @OneToMany(() => Review, (review) => review.product)
  // review: Review[];

  // @OneToMany(() => ProductVariant, (productvariant) => productvariant.product)
  // productvariant: ProductVariant[];

  // @OneToOne(() => ProductImage)
  // @JoinColumn()
  // productimage: ProductImage

}
